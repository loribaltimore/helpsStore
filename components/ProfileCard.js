"use client"

export default function ProfileCard({user, setCounter, currentUserId}) {
  const { name, age, description, hobbies } = user;

  const showedInterest = async (interested) => {
    await fetch('/api/user/connections', {
      method: 'POST',
      body: JSON.stringify({
        interested: interested,
        userId: user._id,
        currentUserId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (data) => {
      const res = await data.json();
      console.log(res);
    }).catch(err => console.log(err))
  };

    return (
        <div className="m-auto mt-28 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl w-3/4">
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span-4 lg:col-span-5">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <img src="./guy.jpg" alt="Interior of light green canvas bag with padded laptop sleeve and internal organization pouch." className="object-fill object-center"/>
              </div>
              <p className="absolute left-4 top-4 text-center sm:static sm:mt-6">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View full details</a>
              </p>
            </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <h2 className="text-black text-4xl">{name.first + ' ' + name.last}</h2>
              <section aria-labelledby="information-heading" className="mt-4">
                <h3 id="information-heading" className="sr-only">Product information</h3>

                <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">{age}</p>
                  <div className="ml-4 border-l border-gray-300 pl-4">
                    <h4 className="sr-only">Type-o-Meter</h4>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        <svg className="text-gray-300 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="sr-only">3.9 out of 5 stars</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 font-medium text-gray-500"> 4 Miles Away</p>
                </div>
                    </section>
                    <section className="p-2">
              <p className="text-gray-500">{description}</p>
            </section>
            <section className="grid grid-rows-2 grid-flow-col gap-1 w-1/2">
              {
                hobbies.map((hobby, index) => {
                  return <div key={index} className="text-white bg-indigo-600 text-xs text-center p-1 rounded-full">{hobby}</div>
                })
              }
            </section>

              <section aria-labelledby="options-heading" className="mt-6">
                <h3 id="options-heading" className="sr-only">Product options</h3>

                  <div className="sm:flex sm:justify-between">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-700">Type</legend>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none">
                          <input type="checkbox" name="size-choice" value="18L" className="sr-only" aria-labelledby="size-choice-0-label" aria-describedby="size-choice-0-description"/>
                          <p id="size-choice-0-label" className="text-base font-medium text-gray-900 text-center">Looks</p>
                          <p id="size-choice-0-description" className="mt-1 text-sm text-gray-500"></p>
                          <div className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></div>
                        </div>
                        <div className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none">
                          <input type="checkbox" name="size-choice" value="20L" className="sr-only" aria-labelledby="size-choice-1-label" aria-describedby="size-choice-1-description"/>
                          <p id="size-choice-1-label" className="text-base font-medium text-gray-900">Personality</p>
                          <p id="size-choice-1-description" className="mt-1 text-sm text-gray-500"></p>
                          <div className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="mt-4 flex">
                    <a href="#" className="group flex text-sm text-gray-500 hover:text-gray-700">
                    </a>
                  </div>
                  <div className="mt-6 flex space-x-1">
                  <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={async () => {
                    await showedInterest(true);
                    console.log("clicked");
                    setCounter(prev => prev + 1)
                  }}
                  >
                    I&apos;m Interested</button>
                  <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={async () =>{
                    await showedInterest(false)
                    setCounter(prev => prev + 1)
                  }
                  }
                >
                    Pass</button>
                  </div>
                  <div className="mt-6 text-center">
                    <a href="#" className="group inline-flex text-base font-medium">
                    </a>
                  </div>

              </section>
            </div>
          </div>
        </div>
    )
}