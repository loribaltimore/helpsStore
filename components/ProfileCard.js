"use client"
import Carousel from 'components/Carousel';
import { useContext } from 'react';
import Rater from 'components/Rater';
import { ReviewContext } from 'components/ReviewContext';
import Upgrade from 'components/Upgrade';

export default function ProfileCard({ user, setAllLikedBy, setCounter, counter, currentUser, distance,
  setConnection, isBank, isRev, setCompatibility, isCurrentUser }) {
  const { setShowReviews, setShowUpgrade, showUpgrade, setBankConnection } = useContext(ReviewContext);
  const { name, age, description, hobbies, rating, sign, photos } = user;
  const currentUserFormatted = JSON.parse(currentUser);
  const canVoteNegative = currentUserFormatted.rating.looks.count % 10 === 0; 

  // useEffect(() => {
  //   const asyncWrapper = async () => {
  //     const searchParams = new URLSearchParams();
  //     user.photos.forEach(photo => {
  //       searchParams.append('photos[]', photo);
  //     })
  //     const url = `https://datr-lyart.vercel.app/api/user/photos?${searchParams.toString()}`;
  //     await fetch(url, {
  //       method: 'GET',
  //     }).then(async data => {
  //       setPhotos(await data.json());
  //     }).catch(err => console.log(err));
  //   }
  //   asyncWrapper();
  // }, [user, counter, setCounter]);
  const flooredRating = Math.round(rating.looks.total / rating.looks.count);
    return (
        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="space-y-16 sm:col-span-4 lg:col-span-5">
          <Carousel photos={photos} />
             {
          isBank || isRev?
            <button
              className='hover:ring ring-[#F3D202] ring-inset text-black border border-black mx-auto block px-6 py-5 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out relative block rounded border border-black p-4 active:scale-100 transition-all duration-100 ease-in-out'
              onClick={() => {
                setShowUpgrade(false);
                setBankConnection(null);
              }}
            >close</button>
                    : null
        }
          </div>
          {
            showUpgrade ?
            <div className='absolute bg-white z-40'>
              <Upgrade />
            </div> : null
          }
          <div className="sm:col-span-8 lg:col-span-7">
            <div className="flex items-center">
            <div className='w-1/2'>
              <h2 className="text-black text-5xl font-extralight">{name}</h2>
              <section aria-labelledby="information-heading" className="mt-4">
                <h3 id="information-heading" className="sr-only">Product information</h3>
                <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">{age}</p>
                  <div className="ml-4 border-l border-gray-300 pl-4">
                      <div className="flex items-center">
                      <p className='text-black'>{sign}</p>
                      <div className="flex items-center">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
</svg>
                <p className="ml-2 font-medium text-gray-500">{distance} Miles Away</p>
                </div>
              </section>
              </div>
              <div className='w-1/2 '>
                <p className='text-black font-extralight text-[7rem]'>{flooredRating}</p>
                </div>
            </div>
                    <section className="p-2">
              <p className="text-gray-500">{description}</p>
            </section>
            <div className='w-100 flex space-x-12'>
            <section className="grid grid-rows-2 grid-flow-col gap-1 w-1/2">
              {
                hobbies.map((hobby, index) => {
                  return <div key={index} className="text-black border border-black text-xs text-center p-1 rounded">{hobby}</div>
                })
              }
              </section>
              <button className='hover:ring ring-[#02F3B0] ring-inset text-black border border-black rounded w-1/4 h-1/4 my-auto py-2 flex text-center'
                onClick={() => {
                  if (JSON.parse(currentUser).membership.membershipType === 'pro') {
                     setShowReviews(true);
                  } else {
                    setShowUpgrade(true);
                  }
                }
                }
              >
                <span className='block mx-auto'>
                  <section className='flex'>
                  Reviews
                  {
                    JSON.parse(currentUser).membership.membershipType === 'pro' ?
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg> :
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black font-extralight w-5 h-5 m-0 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  }
                  </section>
                </span>
              </button>
            </div>
            <section aria-labelledby="options-heading" className="mt-6 border-t border-t-black">
              {
                ( !isCurrentUser) ?
                  <Rater
                    rating={rating.looks.total / rating.looks.count}
                    canVoteNegative={canVoteNegative}
                    setAllLikedBy={setAllLikedBy}
                    setCounter={setCounter}
                    setCompatibility={setCompatibility}
                    setConnection={setConnection}
                  userId={user._id}
                  counter={counter}
                    currentUserId={currentUserFormatted._id}
                  /> : null
              }
              </section>
            </div>
        </div>
    )
};