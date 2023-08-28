import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewPanel({ connection, updatedReviews }) {
  console.log(connection);
    const reviews = updatedReviews.length ? updatedReviews : JSON.parse(connection).reviews;
  return (
    <div className="bg-white p-4 rounded-md mb-10 ">
      <div className=''>
        <div className="-my-10 border p-4">
                  {
                        reviews && reviews.length ?
                      reviews.map((review, reviewIdx) => (
            <div key={reviewIdx} className="flex space-x-4 text-sm text-gray-500">
              <div className="flex-none py-10">
                <img src={review.avatarSrc} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
              </div>
              <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'flex-1 py-10')}>
                <h3 className="font-medium text-gray-900">{review.from}</h3>
                <p>
                  <time dateTime={review.date}>{new Date(review.date).toLocaleDateString()}</time>
                </p>
                <div className="mt-4 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        review.rating >= rating + 1 ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                                  </div>
                                  <p>{review.text}</p>
                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: review.content }}
                />
              </div>
            </div>
           )) :
                          <p className='text-black'>Be the first to leave a review!</p>
                  }
        </div>
      </div>
    </div>
  )
};