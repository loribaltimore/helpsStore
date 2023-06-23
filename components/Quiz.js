"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ShowCompatibility from './ShowCompatibility';

export default function Quiz({ randomQuestions, currentQuestion,
    setCurrentQuestion, question, possibleAnswers, chosen, matched, setMatched}) {
    const { data: session } = useSession();
    const [isAnswered, setIsAnswered] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [showChosen, setShowChosen] = useState(false);
    const [isClicked, setIsClicked] = useState(undefined);
    const [isShowCompatibility, setIsShowCompatibility] = useState(false);

    const questions = randomQuestions.map(question => question.question);
    console.log(questions);
    console.log(possibleAnswers)

    const handleSubmit = async () => {
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
    return (
           <div className={`m-auto mt-28 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl w-3/4 ${isAnswered ? 'answered' : null}`}>
            {
                currentQuestion <= 5 ?
            <div className="block">
                <h1 className="text-black text-4xl text-center p-5">{question}</h1>
                <section className="grid grid-rows-2 grid-flow-col gap-2 p-5">
                    {possibleAnswers.map((answer, index) => {
                        return <div key={index}>
                            <div className={`h-[1rem]`}>
                                {
                                chosen === answer && showChosen?
                                    <h1 className='text-black text-sm'>{matched.currentUser.name} chose...</h1>
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
                    <div className='w-3/4 mx-auto block space-y-5'>
                        {
                            !isShowCompatibility ?
                                <div className='space-y-3 p-3'>    
                                <h1 className='w-1/2 block mx-auto text-4xl text-black'>Your Answers</h1>
                                <div className='grid grid-rows-3 grid-flow-col gap-4'>
                        {
                            questions.map((question, index) => {
                                const { chosen } = answers[index];
                                const connectionChosen = chosen;
                                return <div className='border-2 text-center' key={index}>
                                    <p className='text-black text-sm'>Question:</p> 
                                    <p className='text-black text-lf mb-2'>{question}</p>
                                    <div className='flex  text-center mx-auto'>
                                        <div className='block mx-auto'>
                                            <p className='text-black text-sm'>You chose..</p>   
                                            <p className='text-black text-md'>{chosen}</p> 
                                            </div>
                                            {
                                                connectionChosen ?
                                                 <div className='block mx-auto'>
                                                        <p className='text-black text-sm'>{matched.currentUser.name} chose..</p>   
                                                 <p className='text-black text-md'>{chosen}</p> 
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                            })
                            }
                                    </div>
                                </div>
                                    : <ShowCompatibility matched={matched} setMatched={setMatched} />
                        }
                       
                        <button className='p-2 bg-indigo-400 block w-1/4 mx-auto rounded'
                        onClick={() => handleSubmit()}
                            >Submit</button>
                        </div>
            }
        </div>
    )
};
