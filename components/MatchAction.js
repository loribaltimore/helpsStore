
export default function MatchAction({setIsTrivia}) {

    return (
        <div className="w-3/4 h-[20rem] space-y-3 relative rounded-xl bg-gradient-to-b from-green-900 to-green-600 m-5 mx-auto">
            <div className="w-1/2 text-9xl mx-auto text-center">
                <p className="matched">Match!!</p>
            </div>
            <div className="icebreaker">
             <h1 className="text-black text-3xl text-center">Ice Breakers</h1>
            <div className="flex w-1/2 mx-auto space-x-2">
                <button className="bg-white w-1/2 h-[6rem] rounded-xl text-black hover:scale-105 active:scale-100">
                        <p className="text-2xl"
                            onClick={() => setIsTrivia(true)}
                        >Trivia</p>
                </button>
                <button className="bg-white w-1/2 h-[6rem] rounded-xl text-black  hover:scale-105 active:scale-100 ">
                    <p className="text-2xl"></p>
                </button>
            </div>
            </div>
        </div>
    )
}