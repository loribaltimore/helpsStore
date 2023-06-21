"use client"
import Quiz from '../components/Quiz';
import { useState } from 'react';
import questions from '../util/questions';
import { useSession } from 'next-auth/react';

export default function FullQuiz({matched, setMatched}) {
    const { data: session } = useSession();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    let connectionAnswers = matched.allTriviaAnswers ? matched.allTriviaAnswers.me : undefined;
    const randomQuestions = connectionAnswers || questions.sort(() => Math.random() - 0.5).slice(0, 6);

    const handleClick = async () => {
        await fetch('/api/user/connections/quiz', {
            method: 'POST',
            body: JSON.stringify({
                answers,
                activeUserId: session.userId,
                connectionId: matched.currentUser._id
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async data => {
            setMatched(false);
        }).catch(err => console.log(err));
    };
    return (
        <div>
            {
                    <Quiz query={randomQuestions[currentQuestion] || false}
                        setCurrentQuestion={setCurrentQuestion}
                        currentQuestion={currentQuestion}
                        setAnswers={setAnswers}
                        allChosen={answers}
                        matchedName={matched.currentUser.name}
                        />
            }
        </div>
    )
};

// connect answers to connection in userSchema using a userSchema method called icebreaker. 
