

export default function QuizResults({ questions, answers, matched}) {
    
    return (
    <div className='w-3/4 mx-auto block space-y-5'>
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
)
};