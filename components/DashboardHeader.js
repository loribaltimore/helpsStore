"use client"
import MetricsDiff from 'components/MetricsDiff';
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';

export default function DashboardHeader({likedPercentage, looksRating, dateRating, name}) {
    const { setShowProfile, showProfile } = useContext(ReviewContext);
    
    const stats = [
        { label: 'Liked Percentage', value: `${likedPercentage.totalLikedByPercentage || 0}%`, type: likedPercentage.likedTrend },
        { label: 'Looks Rating', value: looksRating.looksRating, type: looksRating.looksTrend},
        { label: 'Date Rating', value: dateRating.dateRating, type: dateRating.dateTrend },
    ];
    const user = {
  name: name,
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
  return (
    <div className="overflow-hidden rounded bg-white shadow sticky top-0 z-40">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className="bg-white p-3">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
            </div>
            <div className="text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-lg font-extralight text-gray-600">Welcome back,</p>
              <p className="text-4xl font-extralight text-gray-900">{user.name}</p>
              <p className="text-lg font-extralight text-gray-600">{user.role}</p>
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
}
