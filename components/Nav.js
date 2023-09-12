"use client"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LoadingBar from 'components/LoadingBar';
import { useContext, useState } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import { NotifContext } from 'components/NotifContext';

export default function Nav({ children, notifications }) {
  const { data: session } = useSession();
  const { isLoading } = useContext(ReviewContext);
  const {pReviews, setPReviews, setPChat, pChat,setPBank,pBank} = useContext(NotifContext);
  const { reviews, chat, bank } = notifications ? JSON.parse(notifications) : {};
    return (
<div>
  <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
        </div>
        {
          session ? 
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border border-black px-6">
      <nav className="flex flex-1 flex-col py-5">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <li>
                <Link href="/dashboard" className="text-black hover:border border-black group flex gap-x-3 rounded p-2 text-lg leading-6 font-extralight">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                       Dashboard
                            {
                              reviews.length || pReviews ?
                              <span className='border border-black bg-gray-300 w-2 h-2 rounded-full'></span> : null
                            }
                </Link>
              </li>
              <li>
                          <Link href="/chat/all" className="text-black hover:border border-black group flex gap-x-3 rounded p-2 text-lg leading-6 font-extralight"
                            onClick={() => setPChat(false)}
                          >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                            Chat
                            {
                              chat.length || pChat?
                              <span className='border border-black bg-gray-300 w-2 h-2 rounded-full'></span> : null
                            }
                </Link>
              </li>
              <li>
                <Link href="/mingle" className="text-black hover:border border-black group flex gap-x-3 rounded p-2 text-lg leading-6 font-extralight">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                  Mingle
                </Link>
              </li>
              <li>
                          <Link href="/bank" className="text-black hover:border border-black group flex gap-x-3 rounded p-2 text-lg leading-6 font-extralight"
                            onClick={() => setPBank(false)}
                          >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                      </svg>
                            Admirers
                            {
                              bank.length || pBank?
                              <span className='border border-black bg-gray-300 w-2 h-2 rounded-full'></span> : null
                            }
                </Link>
              </li>
              <li>
                <Link href={!session ? '/auth/signin' : '/auth/signout'} className="text-black hover:border border-black group flex gap-x-3 rounded p-2 text-lg leading-6 font-extralight">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                        {
                          !session ?
                            'Sign In' : 'Sign Out'
                        }
                </Link>
              </li>
              <li>
              </li>
            </ul>
          </li>

        </ul>
            </nav>
          </div>
        </div> : null
        }
  
        {
          isLoading ?
                    <LoadingBar /> : null
        }

        <main className={`${session ? 'lg:pl-72': null} h-screen overflow-y-scroll`}>
                    {children}
  </main>
</div>
    )
};
