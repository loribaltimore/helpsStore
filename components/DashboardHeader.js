"use client"
import MetricsDiff from 'components/MetricsDiff';
import Image from 'next/image';

export default function DashboardHeader({likedPercentage, looksRating, dateRating, photo, name}) {
    const stats = [
        { label: 'Liked Percentage', value: `${likedPercentage.totalLikedByPercentage || 0}%`, type: likedPercentage.likedTrend },
        { label: 'Looks Rating', value: looksRating.looksRating, type: looksRating.looksTrend},
        { label: 'Date Rating', value: dateRating.dateRating, type: dateRating.dateTrend },
    ];
  return (
    <div className="overflow-hidden rounded bg-white shadow sticky top-0 z-40">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className="bg-white p-3">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
            <Image
              src={`/api/user/photos/${photo}`}
                  width={100}
              height={100}
              alt="profile picture"
                  className='w-[3rem] h-[3rem] rounded-full object-cover object-center'/>            </div>
            <div className="text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-lg font-extralight text-gray-600">Welcome back,</p>
              <p className="text-4xl font-extralight text-gray-900">{name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-black border-t border-black sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-3 text-center text-sm font-extralight">
                <div className='flex align-top space-x-2'>
                <span className="text-lg text-black">{stat.value}</span>
                <span className="text-lg text-black">{stat.label}</span>
                <MetricsDiff type={stat.type} />
                </div>
            </div>
        ))}
      </div>
    </div>
  )
};

// work on seeding and fetching mingles
