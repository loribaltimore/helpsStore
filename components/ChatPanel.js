"use client"
import PartWays from 'components/PartWays';
import Link from "next/link";
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import { star, star2 } from 'util/stars';
import Image from 'next/image';

export default function ChatPanel({ activeUser, connection, setActiveConnections}) {
  const { setCurrentMongoConnection, setBankConnection } = useContext(ReviewContext);
  const averageCompatibility = Math.round(Object.values(connection.compatibility).reduce((a, b) => a + b) / 5);
  console.log(connection);
  const handleClick = async () => {
      setCurrentMongoConnection(connection);
    await fetch(`/api/user/connections?connectionId=${connection._id}`, {
      method: 'GET',
    }).then(async data => {
      const response = await data.json();
      setBankConnection(JSON.parse(response.connectedTo));
      console.log(response, 'response')
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
  console.log(connection)
  return (
    <div className="p-6 rounded border border-black bg-white sm:px-6 ">
      <div className="px-1 py-2">
        <div className="">
          <div className="flex items-center">
            <img
              src={`/api/user/photos/${connection[connection.activelyConnectedWith].photo}`}
              //     width={500}
              // height={500}
              alt="profile picture"
                  className='w-[3rem] h-[3rem] rounded-full object-cover object-center'/>
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
