"use client"
import Quiz from '../components/Quiz';
import { useState } from 'react';

export default function FullQuiz({ randomQuestions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    return (
        <div>
            <Quiz query={randomQuestions[currentQuestion]}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion} />
        </div>
    )
};