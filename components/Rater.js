
export default function Rater({rating, setRater}) {
    const flooredRating = Math.floor(rating)
    const handleRating = (num) => {
        setRater(num);
    };

    return (
        <div className="sm:flex sm:justify-between">
                    <fieldset>
                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                        onClick={() => handleRating(rating -1)}
                    >
                          <input type="checkbox" name="size-choice" value="18L" className="sr-only" aria-labelledby="size-choice-0-label" aria-describedby="size-choice-0-description"/>
                        <p id="size-choice-0-label" className="text-base font-medium text-gray-900 text-center">Closer to {flooredRating -1}</p>
                          <p id="size-choice-0-description" className="mt-1 text-sm text-gray-500"></p>
                          <div className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></div>
                        </div>
                    <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                     onClick={() => handleRating(rating)}
                    >
                          <input type="checkbox" name="size-choice" value="20L" className="sr-only" aria-labelledby="size-choice-1-label" aria-describedby="size-choice-1-description"/>
                          <p id="size-choice-1-label" className="text-base font-medium text-gray-900">Perfect Rating</p>
                          <p id="size-choice-1-description" className="mt-1 text-sm text-gray-500"></p>
                          <div className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></div>
                        </div>
                    <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                     onClick={() => handleRating(rating + 1)}
                    >
                          <input type="checkbox" name="size-choice" value="20L" className="sr-only" aria-labelledby="size-choice-1-label" aria-describedby="size-choice-1-description"/>
                        <p id="size-choice-1-label" className="text-base font-medium text-gray-900 text-center">Closer to {flooredRating + 1}</p>
                          <p id="size-choice-1-description" className="mt-1 text-sm text-gray-500"></p>
                          <div className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
    )
}