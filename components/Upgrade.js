import { useSession } from 'next-auth/react';
import { CheckIcon } from '@heroicons/react/20/solid';
const tier = {
    name: 'Pro',
    href: '#',
    price: '$30',
    id: 'id',
    description: 'This is the pro tier',
    frequency: {
        priceSuffix: '/mo',
    },
    features: [
        'See people in your bank',
        'Access to reviews and review rating',
        'Unlimited likes',

    ]

}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Upgrade() {
const {data: session} = useSession();
  console.log(session);
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
        <div className='rounded-2xl bg-white text-black w-full h-[30rem] sticky top-36  p-8 border border-2 border-indigo-500 '>
               <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                    'text-lg font-semibold leading-8 text-indigo-600'
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">{tier.frequency.priceSuffix}</span>
        </p>
        <form action="/api/checkout_sessions" method="POST">
          <input type="hidden" name="sessionId" value={session._id} />
          <input type="hidden" name="userId" value={session.userId} />
          <button
            type='submit'
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-6 block rounded-md bg-indigo-500 text-white py-2 px-3 text-center text-sm font-semibold leading-6 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                Buy plan
          </button>
          </form>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
    )
};
