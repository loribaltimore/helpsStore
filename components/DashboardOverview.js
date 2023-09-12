import Carousel from 'components/Carousel';
import { useEffect, useState, useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import ReviewPanel from 'components/ReviewPanel';

export default function DashboardOverview({ user, setAllLikedBy, setCounter, currentUser, distance,
  setConnection, isBank, isRev, setCompatibility, isCurrentUser }) {
  const { setShowReviews, setShowUpgrade, showUpgrade, setBankConnection } = useContext(ReviewContext);
  const { name, age, description, hobbies, rating } = user;
  const currentUserFormatted = JSON.parse(currentUser);
  const [photos, setPhotos] = useState(undefined);
  const canVoteNegative = currentUserFormatted.rating.looks.count % 10 === 0; 
  useEffect(() => {
    const asyncWrapper = async () => {
      const searchParams = new URLSearchParams();
      user.photos.forEach(photo => {
        searchParams.append('photos[]', photo);
      })
      const url = `http://localhost:3000/api/user/photos?${searchParams.toString()}`;
      await fetch(url, {
        method: 'GET',
      }).then(async data => {
        setPhotos(await data.json());
      }).catch(err => console.log(err));
    }
    asyncWrapper();
  }, [user]);

  const flooredRating = Math.round(rating.looks.total / rating.looks.count);
    return (
        <div className=" space-y-10 border border-black m-auto mt-10 mb-10 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded w-3/4">
        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="space-y-16 sm:col-span-4 lg:col-span-5">
            <Carousel photos={photos} />
             {
          isBank || isRev?
            <button
              className='text-black border border-black mx-auto block px-6 py-5 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out relative block rounded border border-black p-4 active:scale-100 transition-all duration-100 ease-in-out'
              onClick={() => {
                setShowUpgrade(false);
                setBankConnection(null);
              }}
            >close</button>
                    : null
        }
          </div>
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
                        <p className='text-black'>Pisces</p>
                      <div className="flex items-center">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
</svg>
                <p className="ml-2 font-medium text-gray-500">0 Miles Away</p>
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
              <button className='text-black border border-black rounded w-1/4 h-1/4 my-auto py-2 flex text-center hover:bg-gray-100'
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
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </section>
                </span>
              </button>
            </div>
                </div>
            </div>
        <div className='p-10'>
                <ReviewPanel connection={currentUser} updatedReviews={[]} />
                </div>

            </div>

    )
};