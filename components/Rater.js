import { useState, useRef, useContext, useEffect } from 'react';
import { ReviewContext } from 'components/ReviewContext';

export default function Rater({ rating, canVoteNegative, setAllLikedBy, setCounter, counter,
  setCompatibility, setConnection, userId, currentUserId }) {
  const { isBank } = useContext(ReviewContext);
const svgRefYes = useRef(null);
const svgRefNo = useRef(null);
  const flooredRating = Math.round(rating)
  const [newRating, setNewRating] = useState(undefined);
  const [interested, setInterested] = useState(undefined);
  
  useEffect(() => {
    const asyncWrapper = async () => {
      await showedInterest(interested);
    };
    if (interested !== undefined && newRating) {
      asyncWrapper();
    }
  }, [newRating, interested]);

  const showedInterest = async () => {
    await fetch('/api/user/connections', {
      method: 'POST',
      body: JSON.stringify({
        interested: interested,
        userId,
        currentUserId,
        rating: newRating
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (data) => {
      setInterested(undefined);
      setNewRating(undefined);
      const res = await data.json();
      const { isMatched, compatibility } = res;
      if (isMatched) {
        const parsedMatch = JSON.parse(isMatched);
        let parsedConnection = parsedMatch.connection;
        parsedConnection.activelyConnectedAs = parsedMatch.connectedAs;
        parsedConnection.activelyConnectedWith = parsedMatch.connectedWith;
        setConnection(parsedConnection);
        setCompatibility(compatibility);
      } else if (isBank) {
        setAllLikedBy(res.isBank)
      } 
      setCounter(prev => prev + 1);
    }).catch(err => console.log(err))
};

    return (
      <div className="flex space-x-16 w-3/4 mx-auto pt-5">
        <div>        
                        <h1 className="text-black text-2xl font-extralight mb-2 text-center">Rate</h1>
        <div className="mt-1 grid grid-cols-1 gapy-4 gap-3 sm:grid-cols-3">
            {
              canVoteNegative || rating + 2 >= 11 ?
                    <div className={`${newRating === rating - 1 ? 'bg-[#02F3B0]' : null} cursor-pointer hover:ring ring-[#02F3B0] ring-inset hover:scale-110 transition-all duration-300 ease-in-out relative block rounded border border-black py-4 px-3 active:scale-100 transition-all duration-100 ease-in-out`}
                  onClick={async() => {
                    setNewRating(rating - 1);
                  }}
                    >
                        <p id="size-choice-0-label" className="text-base font-medium  text-lg text-black text-center">{flooredRating -1}</p>
                  </div>
                  : null
            }
                    <div className={`${newRating === rating ? 'bg-[#02F3B0]' : null} cursor-pointer hover:ring ring-[#02F3B0] ring-inset hover:scale-110 transition-all duration-300 ease-in-out relative block rounded border border-black py-4 px-3 active:scale-100 transition-all duration-100 ease-in-out`}
              onClick={async () => {
                setNewRating(rating);
              }}
                    >
                          <p id="size-choice-1-label" className="text-base text-lg font-medium text-black text-center">{flooredRating}</p>
              </div>
            
                    <div className={`${newRating === rating + 1 ? 'bg-[#02F3B0]' : null} cursor-pointer hover:ring ring-[#02F3B0] ring-inset hover:scale-110 transition-all duration-300 ease-in-out relative block rounded border border-black py-4 px-3 active:scale-100 transition-all duration-100 ease-in-out`}
              onClick={async () => {
                setNewRating(rating + 1);
              }}
                    >
                        <p id="size-choice-1-label" className="text-base text-lg font-medium text-black text-center ">{flooredRating + 1}</p>
            </div>
            {
              !canVoteNegative && rating + 2 < 11?
                    <div className={`${newRating === rating + 2 ? 'bg-[#02F3B0]' : null} cursor-pointer hover:ring ring-[#02F3B0] ring-inset hover:scale-110 transition-all duration-300 ease-in-out relative block rounded border border-black py-4 px-3 active:scale-100 transition-all duration-100 ease-in-out`}
                  onClick={async () => {
                    setNewRating(rating + 2);
                  }}
                    >
                        <p id="size-choice-1-label" className="text-base font-medium text-lg text-black text-center">{flooredRating + 2}</p>
                        </div>: null
            }
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-black text-2xl font-extralight mb-2 text-center">Date</h1>
          <div className="flex space-x-5">
            <svg ref={svgRefYes} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[3rem] h-[3rem] text-black cursor-pointer  hover:scale-110 transition-all duration-300 ease-in-out active:scale-100 transition-all duration-100 ease-in-out"
              onClick={async () => {
                setInterested(true);
                 svgRefYes.current.setAttribute('fill', "#02F3B0");;
            }}
              onMouseEnter={() => {
                 svgRefYes.current.setAttribute('fill', "#02F3B0");;
              }}
              onMouseLeave={() => {
                 svgRefYes.current.setAttribute('fill', "none");;
              }}
            >
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
            <svg ref={svgRefNo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[3rem] h-[3rem] text-black cursor-pointer  hover:scale-110 transition-all duration-300 ease-in-out active:scale-100 transition-all duration-100 ease-in-out"
              onClick={async () => {
                setInterested(false);
              svgRefNo.current.setAttribute('fill', "#F3D202");;
            }}
              onMouseEnter={() => {
                 svgRefNo.current.setAttribute('fill', "#F3D202");;
              }}
              onMouseLeave={() => {
                 svgRefNo.current.setAttribute('fill', "none");;
              }}
            >
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg>
          </div> 
           </div>
                  </div>
    )
};