import MetricsDiff from 'components/MetricsDiff';

export default function DashboardHeader({likedPercentage, looksRating, dateRating, name}) {
    const stats = [
        { label: 'Liked Percentage', value: `${likedPercentage.totalLikedByPercentage}%`, type: likedPercentage.likedTrend },
        { label: 'Looks Rating', value: looksRating.looksRating, type: looksRating.looksTrend},
        { label: 'Date Rating', value: dateRating.dateRating, type: dateRating.dateTrend },
    ];
    const user = {
  name: name,
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow sticky top-0 z-40">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
              <p className="text-sm font-medium text-gray-600">{user.role}</p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View profile
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-5 text-center text-sm font-medium">
                <div className='flex align-top space-x-2'>
                <span className="text-gray-900">{stat.value}</span>
                <span className="text-gray-600">{stat.label}</span>
                <MetricsDiff type={stat.type} />
                </div>
          </div>
        ))}
      </div>
    </div>
  )
}
