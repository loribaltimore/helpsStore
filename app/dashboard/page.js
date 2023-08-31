import User from 'models/userSchema';
import  database  from 'models/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import DashboardWidget from 'components/DashboardWidget';

export async function getData(userId) {
    await database();
    const currentUser = await User.findById(userId);
    const looksRating = currentUser.rating.looks.avg;
    const dateRating = currentUser.rating.date.avg;
    const totalLiked = currentUser.connections.liked.length;
    console.log(totalLiked, 'Total Liked');
    const totalRejectedBy = currentUser.connections.rejectedBy.length;
    const totalRejected = currentUser.connections.rejected.length;
    console.log(totalRejected, 'total rejected');
    const totalInteractions = totalRejected + totalLiked;
    const likedPercentage = `${(totalLiked / totalInteractions) || 0}%`;
    const rejectedByPercentage = `${totalRejectedBy / currentUser.rating.looks.count}%`;
    const looksMetrics = currentUser.toObject().rating.looks.metricsByAge;
    const totalLikedBy = currentUser.connections.pending.length + currentUser.connections.matched.length;
//     const metricsByAgeObject = Object.fromEntries(currentUser.rating.looks.metricsByAge);
// console.log(metricsByAgeObject, 'IS WORKING');
    return { likedPercentage, rejectedByPercentage, looksRating, dateRating, looksMetrics, totalLikedBy, totalRejectedBy};
};

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const { likedPercentage, rejectedByPercentage, looksRating, dateRating, looksMetrics, totalLikedBy, totalRejectedBy } = await getData(session.userId);
console.log( totalRejectedBy, totalLikedBy)
    return (
        <div class="grid grid-rows-2 grid-flow-col gap-2 p-5 h-[50rem]">
            <div className="rounded-xl text-center my-auto">
                <DashboardWidget looksMetrics={looksMetrics} />
                {/* <h1 className='text-[10rem]'>{likedPercentage}</h1>
                <p>% of profiles you like</p> */}
            </div>
            <div className=" rounded-xl text-center my-auto">
                <DashboardWidget likeRatio={{passed: totalRejectedBy, liked: totalLikedBy}} />
            </div>
            <div className="bg-pink-400 rounded-xl text-center my-auto">
                <h1 className='text-[10rem]'>{rejectedByPercentage}</h1>
                <p>% of profiles that like you</p>
            </div>
            <div className="bg-pink-400 rounded-xl text-center my-auto">
                <h1 className='text-[10rem]'>{dateRating + '/10'}</h1>
                <p>Average Date Rating</p>
            </div>
        </div>
    )
};

//make sure that liking and rejecting is going to add into metrics in dashboard
//style dashboard
//update preferences