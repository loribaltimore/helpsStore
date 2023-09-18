"use client"
import { useState, useContext } from 'react';
import ReviewPanel from 'components/ReviewPanel';
import ReviewInput from 'components/ReviewInput';
import { ReviewContext } from 'components/ReviewContext';
import Image from 'next/image';

export default function Reviews({ connection }) {
    const { currentMongoConnection, setShowReviews } = useContext(ReviewContext);
  const [updatedReviews, setUpdatedReviews] = useState([]);
    const formattedConnection = connection && typeof connection === 'object'? connection : JSON.parse(connection);
  const flooredRating = Math.round(formattedConnection.rating.date.total / formattedConnection.rating.date.count);
  
  return <div className=''>
            <div className='w-100 flex mb-10'>
                <div className='w-full flex space-x-4'>
                    <div className='w-full flex'>
                        <div className="p-5 sm:flex space-x-5">
            <div className=" flex-shrink-0">
              <Image src={`/api/user/photos/${connection.photos}`}
                  width={500}
                  height={500}
                  alt="profile picture"
                  className='w-[3rem] h-[3rem] object-cover object-center rounded-full'/>
            </div>
            <div className=" mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-4xl font-extralight text-gray-900">{formattedConnection.name}</p>
                            </div>
                        </div>
            </div>
                <h1 className='text-[4rem] text-black flex w-100 font-extralight space-x-5'>{flooredRating}
            <svg xmlns="http://www.w3.org/2000/svg" fill="goldenrod" viewBox="0 0 24 24" strokeWidth={1.5} stroke="goldenrod" className="w-[2rem] h-[2rem]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            </h1>
                </div>
            </div>
            <ReviewPanel connection={typeof connection == 'object' ? JSON.stringify(connection) : connection} updatedReviews={updatedReviews} />
          <div className='mt-16'>
                <ReviewInput connection={connection}
                    setUpdatedReviews={setUpdatedReviews}
                    currentMongoConnection={JSON.stringify(currentMongoConnection)}
            />
             <button className='hover:ring ring-[#F3D202] ring-inset  block mx-auto text-black border border-black py-3 px-5 rounded'
                    onClick={() => {setShowReviews(false)}}
                >back</button>
      </div> 
      </div>
};

//hobby input limit and reactivity
//location input
//user sort