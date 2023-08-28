"use client"
import Quiz from '../components/Quiz';
import { useState } from 'react';
import questions from '../util/questions';

export default function FullQuiz({connection, setConnection}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    let connectionAnswers = false;
    if (connection.trivia) {
        connectionAnswers = connection.trivia[connection.activelyConnectedWith].length 
    };
    let question = false;
    let answers;
    let chosen;
    const [randomQuestions, setRandomQuestions] = useState(connectionAnswers || questions.sort(() => Math.random() - 0.5).slice(0, 6));
    if (randomQuestions[currentQuestion]) {
        question = randomQuestions[currentQuestion].question;
        answers = randomQuestions[currentQuestion].answers;
        chosen = randomQuestions[currentQuestion].chosen;
    };
    console.log(currentQuestion);
    console.log(randomQuestions);
    return (
        <div className='w-100'>
                <Quiz setCurrentQuestion={setCurrentQuestion}
                    chosen={chosen}
                    currentQuestion={currentQuestion}
                    randomQuestions={randomQuestions}
                    connection={connection.connection}
                    setConnection={setConnection}
                    question={question || false}
                    possibleAnswers={answers}
                        />
          
        </div>
    )
};

