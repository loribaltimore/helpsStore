
export default function Rater({rating, setRater, canVoteNegative}) {
  const flooredRating = Math.round(rating)
  
    const handleRating = (num) => {
        setRater(num);
    };

    return (
        <div className="sm:flex sm:justify-between">
                    <fieldset>
          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {
              canVoteNegative ?
              <div className="cursor-pointer  relative block rounded-lg border border-gray-300 p-4 hover:scale-105 transition-all duration-300 ease-in-out active:scale-100 transition-all duration-100 ease-in-out"
                        onClick={() => handleRating(rating -1)}
                    >
                        <p id="size-choice-0-label" className="text-base font-medium text-gray-900 text-center">Closer to {flooredRating -1}</p>
                        </div> : null
            }
                    <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out relative block rounded-lg border border-gray-300 p-4 active:scale-100 transition-all duration-100 ease-in-out"
                     onClick={() => handleRating(rating)}
                    >
                          <p id="size-choice-1-label" className="text-base font-medium text-gray-900">Perfect Rating</p>
                        </div>
                    <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out relative block rounded-lg border border-gray-300 p-4 active:scale-100 transition-all duration-100 ease-in-out"
                     onClick={() => handleRating(rating + 1)}
                    >
                        <p id="size-choice-1-label" className="text-base font-medium text-gray-900 text-center">Closer to {flooredRating + 1}</p>
            </div>
            {
              !canVoteNegative ?
                 <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out relative block rounded-lg border border-gray-300 p-4 active:scale-100 transition-all duration-100 ease-in-out"
                     onClick={() => handleRating(rating + 2)}
                    >
                        <p id="size-choice-1-label" className="text-base font-medium text-gray-900 text-center">Closer to {flooredRating + 2}</p>
                        </div>: null
            }
                      </div>
                    </fieldset>
                  </div>
    )
}