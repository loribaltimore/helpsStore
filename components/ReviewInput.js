import {  useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'

export default function ReviewInput({ connection, setUpdatedReviews, currentMongoConnection}) {
    const [review, setReview] = useState('');
    const [parsedConnection, setParsedConnection] = useState(typeof connection === 'object' ? connection :  JSON.parse(connection));
  const [isRating, setIsRating] = useState(1);
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
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
          <div className="min-w-0 flex-1">
              <div className='flex'>
                  {
                  rate.map((element, index) => {
                      return  <StarIcon
                        key={index}
                        className={`${isRating <= index  ? 'text-gray-400' : 'text-yellow-700'} h-5 w-5 flex-shrink-0 cursor-pointer hover:scale-150`}
                        aria-hidden="true"
                        onMouseEnter={() => setIsRating(index + 1)}
                    />
                  })
              }
              </div>
              
             
          <div className="border-b border-gray-200 focus-within:border-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
                          rows={3}
                          name="comment"
                          id="comment"
                          className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
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
                              className="inline-flex items-center rounded text-black px-3 py-2 text-sm border border-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async () => {
                if (currentMongoConnection) {
                  console.log(currentMongoConnection)
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
