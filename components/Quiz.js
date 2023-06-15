"use client"
import { useState } from 'react';

export default function Quiz({ query, setCurrentQuestion, setAnswers }) {
    const { question, answers } = query;
    const [isAnswered, setIsAnswered] = useState(false);

    const handleClick = (event) => {
        setIsAnswered(true);
        setAnswers(prev => [...prev, {question, answer: event.target.innerText}]);
        setCurrentQuestion(prev => prev + 1);
        setTimeout(() => {
            setIsAnswered(false);
        }, 1000)
    }

    return (
           <div className={`m-auto mt-28 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl w-3/4 ${isAnswered ? 'answered' : null}`}>
            <div>
            </div>
            <div className="block ">
                <h1 className="text-black text-4xl text-center p-5">{question}</h1>
                <section className="grid grid-rows-2 grid-flow-col gap-4 p-5">
                    {answers.map((answer, index) => {
                        return <div key={index} className="cursor-pointer text-slate-800 border-2 rounded-lg hover:bg-indigo-300 active:bg-indigo-500"
                            onClick={(event) => handleClick(event)}
                        >
                        <p className="text-center p-3">{answer}</p>
                    </div>
                })
                }
                </section>
            </div>
        </div>
    )
}