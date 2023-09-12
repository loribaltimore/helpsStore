import { useSession } from 'next-auth/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';
import { ReviewContext } from './ReviewContext';

const tier = {
    name: 'Pro',
    href: '#',
    price: '$30',
    id: 'id',
    description: 'A premium experience for users that want to get the most out of their time on Datr.',
    frequency: {
        priceSuffix: '/mo',
    },
    features: [
        'See your admirers',
        'Access to reviews and review rating',
      'Unlimited likes',
        'See compatibility before matching'
    ]
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Upgrade() {
  const { data: session } = useSession();
  const { setShowUpgrade } = useContext(ReviewContext);
  const handleClick = async () => {
    await fetch('api/checkout_sessions', {
      method: 'POST',
      body: JSON.stringify({
        session,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => console.log(data)).catch(err => console.log(err));
  }
    return (
        <div className='space-y-5 rounded bg-white text-black w-full sticky top-36  p-8 border border border-black '>
        <div className="flex items-center justify-between gap-x-4 w-100">
          <span className='flex w-100'>
              <h3
                  id={tier.id}
                  className='text-4xl font-extralight leading-6 text-black'
                >
                  Datr {tier.name}
          </h3>
          </span>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                ) : null}
        </div>
                  <p className="text-xl font-extralight leading-6 text-gray-600">{tier.description}</p>
        <div className='flex space-x-10 p-5'>
            <div className=''>
              <p className="flex items-baseline gap-x-1">
                <span className="text-5xl font-extralight tracking-tight text-black">{tier.price}</span>
                <span className="text-md font-light leading-6 text-black">{tier.frequency.priceSuffix}</span>
        </p>
        <form action="/api/checkout_sessions" method="POST">
          {
            session ?
              <div>
                          <input type="hidden" name="sessionId" value={session._id} />
          <input type="hidden" name="userId" value={session.userId} />
              </div> : null
          }
          <button
            type='submit'
                aria-describedby={tier.id}
                className='text-black border border-black py-3 px-5 rounded mt-8 hover:translate-110 transition-all duration-300 ease-in-out hover:ring ring-[#02F3B0] ring-inset'
              >
                Subscribe
          </button>
          </form>
        </div>
        <ul role="list" className="space-y-3 text-sm leading-6 text-black">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-[#02F3B0]" aria-hidden="true" />
                  <h1 className='text-xl font-extralight'>{feature}</h1>  
                  </li>
                ))}
              </ul>
        </div>
        <button
          className='hover:ring ring-[#F3D202] ring-inset block mx-auto text-black border border-black py-3 px-5 rounded mt-8 hover:translate-110 transition-all duration-300 ease-in-out '
          onClick={() => setShowUpgrade(false)}
        >
                Close
          </button>
            </div>
    )
};
