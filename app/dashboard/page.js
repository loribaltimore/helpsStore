import User from 'models/userSchema';
import  database  from 'models/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AllDashboard from 'components/AllDashboard';

export async function getData(userId) {
    await database();
    const currentUser = await User.findById(userId.toString());
    const looksRating = currentUser.rating.looks.avg;
    const dateRating = currentUser.rating.date.avg;
    const totalLiked = currentUser.connections.liked.length;
    const totalRejectedBy = currentUser.connections.rejectedBy.length;
    const totalRejected = currentUser.connections.rejected.length;
    const totalInteractions = totalRejected + totalLiked;
    const likedPercentage = `${(totalLiked / totalInteractions) || 0}%`;
    const rejectedByPercentage = `${totalRejectedBy / currentUser.rating.looks.count}%`;
    const looksMetrics = currentUser.toObject().rating.looks.metricsByAge;
    const totalLikedBy = currentUser.connections.pending.length + currentUser.connections.matched.length;
    const { byTotal } = currentUser.interestAndPass;
    return {
        likedPercentage, rejectedByPercentage, looksRating,
        dateRating, looksMetrics, totalLikedBy, totalRejectedBy,
        byTotal, totalInteractions, currentUser
    };
};

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const { looksMetrics, totalLikedBy, totalRejectedBy, byTotal, currentUser } = await getData(session.userId);
    const likedLineData = byTotal ? byTotal.map((element, index) => {
        return element.interested;
    }): null;
    const passedLineData = byTotal ? byTotal.map((element, index) => {
        return element.pass;
    }) : null;
    const matchedLineData = byTotal ? byTotal.map((element, index) => {
        return element.matched;
    }) : null;
    const datedLineData = byTotal ? byTotal.map((element, index) => {
        return element.dated;
    }) : null;
    return (
        <div class="block p-5 h-[50rem] w-100 space-y-10">
            <AllDashboard
                likedLineData={likedLineData}
                currentUser={JSON.stringify(currentUser)}
                looksMetrics={JSON.stringify(Object.fromEntries(looksMetrics))}
                totalLikedBy={totalLikedBy}
                totalRejectedBy={totalRejectedBy}
                passedLineData={passedLineData}
                matchedLineData={matchedLineData}
                datedLineData={datedLineData}
            />
        </div>
    )
};