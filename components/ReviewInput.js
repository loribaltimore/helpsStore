import {  useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';

export default function ReviewInput({ connection, setUpdatedReviews, currentMongoConnection}) {
    const [review, setReview] = useState('');
    const [parsedConnection, setParsedConnection] = useState(typeof connection === 'object' ? connection :  JSON.parse(connection));
  const [isRating, setIsRating] = useState(1);
  const parsedMongoConnection = JSON.parse(currentMongoConnection);
    const rate = [0, 1, 2, 3, 4]
    const handleClick = async () => { 
        await fetch('/api/user/connections/review', {
            method: 'POST',
            body: JSON.stringify({reviewText: review, reviewRating: isRating, connectionId: parsedConnection._id, currentMongoConnectionId: JSON.parse(currentMongoConnection)._id}),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(async data => {
            const newReviews = await data.json();
            setUpdatedReviews(newReviews.allReviews); 
        }).catch(err => console.log(err));
    };
  return (
    <div className="flex items-start space-x-4 mt-2">
      <div className="flex-shrink-0">
        <Image src={`/api/user/photos/${parsedMongoConnection[parsedMongoConnection.activelyConnectedAs].photo}`}
                  width={500}
                  height={500}
                  alt="profile picture"
                  className='w-[3rem] h-[3rem] object-cover object-center rounded-full'/>
      </div>
          <div className="min-w-0 flex-1">
              <div className='flex'>
                  {
                  rate.map((element, index) => {
                      return  <StarIcon
                        key={index}
                        className={`${isRating <= index  ? 'text-gray-400' : 'text-[#F3D202]'} h-5 w-5 flex-shrink-0 cursor-pointer hover:scale-150`}
                        aria-hidden="true"
                        onMouseEnter={() => setIsRating(index + 1)}
                    />
                  })
              }
              </div>
              
             
          <div className="border-b border-black focus-within:border-[#02F3B0]">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
                          rows={3}
                          name="comment"
                          id="comment"
                          className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-[#02F3B0] focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Add your comment..."
                          value={review}
                            onChange={(e) => setReview(e.target.value)}
                      />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5">
            </div>
            <div className="flex-shrink-0">
              <button
                              className="hover:ring ring-[#02F3B0] ring-inset inline-flex items-center rounded text-black px-3 py-2 text-sm border border-black shadow-sm  focus-visible:outline "
              onClick={async () => {
                if (currentMongoConnection) {
                await handleClick()
                }
              }}
          >
                Post
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}
