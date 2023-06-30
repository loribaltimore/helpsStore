"use client"
import Quiz from '../components/Quiz';
import { useState } from 'react';
import questions from '../util/questions';

export default function FullQuiz({matched, setMatched}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    let connectionAnswers = matched.allTriviaAnswers ? matched.allTriviaAnswers.me : undefined;
    const randomQuestions = connectionAnswers || questions.sort(() => Math.random() - 0.5).slice(0, 6);
    let question = false;
    let answers;
    let chosen;
    
    if (randomQuestions[currentQuestion]) {
        question = randomQuestions[currentQuestion].question;
        answers = randomQuestions[currentQuestion].answers;
        chosen = randomQuestions[currentQuestion].chosen;
    };

    return (
        <div>
                <Quiz setCurrentQuestion={setCurrentQuestion}
                    chosen={chosen}
                    currentQuestion={currentQuestion}
                    randomQuestions={randomQuestions}
                    matched={matched}
                    setMatched={setMatched}
                    question={question || false}
                    possibleAnswers={answers}
                        />
            <div> 
            </div>
        </div>
    )
};

