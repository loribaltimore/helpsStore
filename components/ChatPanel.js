"use client"
import PartWays from 'components/PartWays';
import Link from "next/link";

export default function ChatPanel({ activeUser, connection, setActiveConnections }) {
  const { currentUser } = connection;
  const takeQuiz = currentUser.connections[activeUser._id] && currentUser.connections[activeUser._id].them && !currentUser.connections[activeUser._id].me;
  console.log(currentUser.connections[activeUser._id]);
  return (
    <div className="w-3/4 mx-auto rounded-xl border-gray-200 bg-white px-4 py-5 sm:px-6 ">
      <div className=" p-5 -ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap ">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">{currentUser.name}</h3>
              <p className="text-sm text-gray-500">
              </p>
            </div>
          </div>
        </div>
        {
          !takeQuiz ?
          <div className="ml-4 mt-4 flex flex-shrink-0 space-x-2">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <span>Poke</span>
          </button>
          <Link className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              href="/chat/1">
            <span>Chat</span>
          </Link>
          <PartWays activeUserId={activeUser._id} connection={connection} setActiveConnections={setActiveConnections} />
            </div>
            :
            <button
             className="relative inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500"
            >Take Quiz</button>
        }
      </div>
    </div>
    )
}