import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewPanel({ connection, updatedReviews }) {
  const reviews = updatedReviews.length ? updatedReviews : JSON.parse(connection).reviews;
  return (
    <div className="bg-white p-4 rounded mb-10 ">
      <div className=''>
        <div className="-my-10 border rounded p-4">
                  {
                        reviews && reviews.length ?
                      reviews.map((review, reviewIdx) => (
            <div key={reviewIdx} className="flex space-x-4 text-sm text-gray-500">
                          <div className="flex-none py-10">
                            <img src={`/api/user/photos/${JSON.parse(connection).photos}`}
                  // width={500}
                  // height={500}
                  alt="profile picture"
                  className='w-[3rem] h-[3rem] object-cover object-center rounded-full'/>
              </div>
              <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-black', 'flex-1 py-10')}>
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
                          <p className='text-black text-4xl font-extralight'>No Reviews Yet</p>
                  }
        </div>
      </div>
    </div>
  )
};