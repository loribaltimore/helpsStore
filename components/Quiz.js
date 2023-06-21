"use client"
import { useState } from 'react';

export default function Quiz({ query, setCurrentQuestion, setAnswers, matchedName, allChosen}) {
    const { question, answers, chosen } = query;
    const [isAnswered, setIsAnswered] = useState(false);
    const [showChosen, setShowChosen] = useState(false);
    const [isClicked, setIsClicked] = useState(undefined);

    const handleClick = (event) => {
        setShowChosen(true);
        setIsClicked(event.target.innerText);
        setTimeout(() => {
            setIsAnswered(true);
            setAnswers(prev => [...prev, { question, possibleAnswers: answers, chosen: event.target.innerText, }]);
            setCurrentQuestion(prev => prev + 1);
            setShowChosen(false);
        setTimeout(() => {
                setIsAnswered(false);
            }, 1000)
        },  1750);
    }
    console.log(allChosen)
    return (
           <div className={`m-auto mt-28 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl w-3/4 ${isAnswered ? 'answered' : null}`}>
            {
                query.question ?
            <div className="block">
                <h1 className="text-black text-4xl text-center p-5">{question}</h1>
                <section className="grid grid-rows-2 grid-flow-col gap-2 p-5">
                    {answers.map((answer, index) => {
                        return <div key={index}>
                            <div className={`h-[1rem]`}>
                                {
                                chosen === answer && showChosen?
                                    <h1 className='text-black text-sm'>{matchedName} chose...</h1>
                                        :
                                        isClicked === answer ? 
                                            <h1 className='text-black text-sm'>You chose...</h1>
                                            :
                                    null
                            }
                            </div>
                            <div className={`cursor-pointer text-slate-800 ${chosen === answer && showChosen ?
                                'bg-green-400' : isClicked === answer ? 'bg-indigo-400' : null
                                } border-2 rounded-lg hover:bg-indigo-300 active:bg-indigo-500`}
                            onClick={(event) => handleClick(event)}
                        >
                        <p className="text-center p-3">{answer}</p>
                            </div>
                    </div>
                })
                }
                </section>
                    </div> : 
                <button className='p-2 bg-indigo-400 block w-1/4 mx-auto rounded'>Submit</button>
            }
        </div>
    )
};

finish submit button on quiz submit
build compatibility component