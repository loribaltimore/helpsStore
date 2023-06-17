"use client"
import Quiz from '../components/Quiz';
import { useState } from 'react';
import questions from '../util/questions';
import { useSession } from 'next-auth/react';

export default function FullQuiz({currentMingle}) {
    const { data: session } = useSession();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 6);

    const handleClick = async () => {
        await fetch('/api/user/connections/quiz', {
            method: 'POST',
            body: JSON.stringify({
                answers, 
                activeUserId: session.userId,
                connectionId: currentMingle._id
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async data => {
            const res = await data.json();
            console.log(res);
        }).catch(err => console.log(err));
    }
    return (
        <div>
            
            {
                answers.length === randomQuestions.length - 1 ?
                <button className='text-black bg-white' onClick={handleClick}>Submit</button>
                :
                 <Quiz query={randomQuestions[currentQuestion]}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
                setAnswers={setAnswers}
            />
            }
        </div>
    )
};

// connect answers to connection in userSchema using a userSchema method called icebreaker. 
