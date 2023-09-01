import User from 'models/userSchema';
import  database  from 'models/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import DashboardWidget from 'components/DashboardWidget';

export async function getData(userId) {
    await database();
    const currentUser = await User.findById(userId.toString());
    const looksRating = currentUser.rating.looks.avg;
    const dateRating = currentUser.rating.date.avg;
    const totalLiked = currentUser.connections.liked.length;
    // console.log(totalLiked, 'Total Liked');
    const totalRejectedBy = currentUser.connections.rejectedBy.length;
    const totalRejected = currentUser.connections.rejected.length;
    // console.log(totalRejected, 'total rejected');
    const totalInteractions = totalRejected + totalLiked;
    const likedPercentage = `${(totalLiked / totalInteractions) || 0}%`;
    const rejectedByPercentage = `${totalRejectedBy / currentUser.rating.looks.count}%`;
    const looksMetrics = currentUser.toObject().rating.looks.metricsByAge;
    const totalLikedBy = currentUser.connections.pending.length + currentUser.connections.matched.length;
    const { byTotal } = currentUser.interestAndPass;
    
    return {
        likedPercentage, rejectedByPercentage, looksRating,
        dateRating, looksMetrics, totalLikedBy, totalRejectedBy,
        byTotal, totalInteractions
    };
};

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const { dateRating, looksMetrics, totalLikedBy, totalRejectedBy, byTotal } = await getData(session.userId);
    const likedLineData = byTotal ? byTotal.map((element, index) => {
        return element.interested;
    }): null;
    const passedLineData = byTotal ? byTotal.map((element, index) => {
        return element.pass;
    }) : null;
    const matchedLineData = byTotal ? byTotal.map((element, index) => {
        console.log(element);
        return element.matched;
    }) : null;
    console.log(likedLineData, 'likedLineData');
    console.log(passedLineData, 'passedLineData');
    console.log(matchedLineData, 'matchedLineData');
    return (
        <div class="block p-5 h-[50rem] w-100 space-y-5">
            <div className="rounded-xl text-center mx-auto w-3/4 bg-white drop-shadow-lg">
                <DashboardWidget looksMetrics={looksMetrics} />
            </div>
            <div className="rounded-xl text-center mx-auto w-1/2 p-5">
                <DashboardWidget likeRatio={{passed: totalRejectedBy, liked: totalLikedBy}} />
            </div>
            <div className="bg-white rounded-xl text-center mx-auto w-3/4">
                <DashboardWidget likedLineData={likedLineData} passedLineData={passedLineData} matchedLineData={matchedLineData} />
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