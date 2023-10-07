"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import logo from '../public/img/helpsLogoBig.png';
import helpsLandingPhoto from '../public/img/helpsLandingPhoto.jpeg';
import Link from 'next/link';

const navigation = [

  { name: 'Log in', href: '#' },
]

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className=" font-extralight">
      <div className='border absolute z-20 text-black shadow-xl bg-white bg-opacity-30 w-1/4 mx-[20%] mt-20 p-5 font-extralight text-center rounded'>
                  For a demo, please use  Log In button above
               </div>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl">
          <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
            <nav className="flex items-center justify-between lg:justify-start" aria-label="Global">
              <a href="#" className="-m-1.5 p-1.5 w-full">
                <span className="sr-only">Your Company</span>
                          <Image
                                  alt="Your Company"
                                  className="h-12 w-auto z-1"
                                  src={logo}
                                  width={300}
                                  height={300}
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="hidden text-center lg:ml-12 lg:flex lg:gap-x-14">
                  <Link href="/auth/signin" className="text-sm font-semibold text-[#fa5555] w-20">
                    Log In
                  </Link>
              </div>
                      </nav>
          </div>
        </div>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <Link
                    href="/auth/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative ">
        
        <div className="mx-auto max-w-7xl z-10">
          
          <div className="relative z-10 pt-auto lg:w-full lg:max-w-2xl" >
            
            <svg
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative z-10 px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0" style={{backgroundImage: `url(/img/logo.jpeg)`}}>
              
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    helps is dedicated to financial transparency.{' '}
                    <a href="#" className="whitespace-nowrap font-semibold text-[#fa5555]">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Retail Re-defined.
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                                  helps is a new take on an old formula. Rather than putting profit before people,
                                  we are creating well paying jobs for our employees and providing the best possible prices for our customers.
                                    We do what we love, you get what you want, and the less fortunate get the help they need.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-[#fa5555] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#fa5555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fa5555]"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src={helpsLandingPhoto}
            alt="men hanging out"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  )
}
