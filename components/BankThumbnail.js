"use client"
import Image from 'next/image';
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import { star, star2 } from 'util/stars';
import Carousel from 'components/Carousel';

export default function BankThumbnail({ connection, membershipType, currentUserPersonality}) {
    const { setShowUpgrade, setBankConnection } = useContext(ReviewContext);
    const compatibilityCalculation = {};
     Object.keys(JSON.parse(currentUserPersonality)).forEach((trait, index) => {
        compatibilityCalculation[trait] = 10 - Math.abs(Math.round(JSON.parse(currentUserPersonality)[trait] - connection.personality[trait]))
     });
  const averageCompatibility = Math.round(Object.values(compatibilityCalculation).reduce((a, b) => a + b) / 5);
    return (
        <div className={`min-w-full min-h-[12rem] rounded flex ${membershipType === 'basic' ? 'blur-sm' : ''} p-6 rounded border border-black bg-white sm:px-6 cursor-pointer z-30 hover:scale-105 transition-all duration-300 ease-in-out hover:ring ring-[#02F3B0] ring-inset` }
        onClick={() => {
                
                if (membershipType === 'pro') {
                    setBankConnection(connection);
                } else {
                    setShowUpgrade(true);
                }
            }}
        >
      <div className="px-2 py-2">
        <div className="space-y-6">
          <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image src={`/api/user/photos/${connection.photos[0]}`}
                  width={500}
                  height={500}
                  alt="profile picture"
                  className='w-[3rem] h-[3rem] object-cover object-center rounded-full'/>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-extralight leading-6 text-black">{connection.name}</h3>
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
                    {
                        membershipType === 'pro' ?
                    <h1 className='text-black text-center font-extralight text-6xl'>{connection.rating.looks.avg}</h1>
                            :
                            <div className='block mx-auto  w-1/2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black font-extralight">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                            </div>

                    }
        </div>
        <div>
        </div>
      </div>
    </div>
    )
};