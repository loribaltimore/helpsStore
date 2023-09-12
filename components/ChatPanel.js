"use client"
import PartWays from 'components/PartWays';
import Link from "next/link";
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';

const star = [
  <svg key={51} className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={52} className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={53} className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={54} className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={55} className="text-yellow-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>
];
const star2 = [
  <svg key={56} className="text-gray-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={57} className="text-gray-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={58} className="text-gray-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={59} className="text-gray-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>,
  <svg key={60} className="text-gray-400 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>
];

export default function ChatPanel({ activeUser, connection, setActiveConnections}) {
  const { setCurrentMongoConnection, setBankConnection } = useContext(ReviewContext);
  const averageCompatibility = Math.round(Object.values(connection.compatibility).reduce((a, b) => a + b) / 5);
  const handleClick = async () => {
      setCurrentMongoConnection(connection);
    await fetch(`/api/user/connections?connectionId=${connection._id}`, {
      method: 'GET',
    }).then(async data => {
      const response = await data.json();
      setBankConnection(JSON.parse(response.connectedTo));
    }).catch (err => console.log(err));
  };

  let activelyConnectedAs;
  let activelyConnectedWith;
  if (activeUser._id === connection.connection1.id) {
    activelyConnectedAs = 'connection1';
    activelyConnectedWith = 'connection2';
  } else {
     activelyConnectedAs = 'connection2';
    activelyConnectedWith = 'connection1';
  };
  const updatedConnection = connection;
  updatedConnection.activelyConnectedWith = activelyConnectedWith;
  updatedConnection.activelyConnectedAs = activelyConnectedAs;  
  
  return (
    <div className="p-6 rounded border border-black bg-white sm:px-6 ">
      <div className="px-1 py-2">
        <div className="">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-extralight leading-6 text-black">{connection[activelyConnectedWith].name}</h3>
              <p className="text-sm text-gray-500">
              </p>
              <div className='flex'>
                {
                  star.map((element, index) => {
                    if (index < averageCompatibility / 2 && index < 5) {
                      return element
                    } else {
                      return star2[index]
                    }
                  })
                }
        </div>
            </div>
          </div>
        </div>
        <div>
          <div className="ml-4 mt-4 flex flex-shrink-0 space-x-2">
                <button
                    type="button"
                    className="border border-black relative inline-flex items-center rounded bg-white px-3 py-2 text-sm  text-black shadow-sm hover:ring ring-[#02F3B0] ring-inset"
                    onClick={async () => { await handleClick() }}
                  >
            Profile
                  </button>
              <Link className="border border-black relative ml-3 inline-flex items-center rounded bg-white px-3 py-2 text-sm text-black shadow-sm hover:ring ring-[#02F3B0] ring-inset"
                href={`/chat/${connection._id}`}>
            <span>Chat</span>
          </Link>
          <PartWays activeUserId={activeUser._id} connection={connection} setActiveConnections={setActiveConnections} />
            </div>
        </div>
      </div>
    </div>
    )
};
