import DashboardHeader from "@/components/DashboardHeader"
import User from 'models/userSchema';
import  database  from 'models/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function getData(userId) {
    const currentUser = await User.findById(userId);
    const dateRating = currentUser.rating.date.avg;
    const looksRating = currentUser.rating.looks.avg;
    const totalRejected = currentUser.connections.rejected.length;
    const totalLiked = currentUser.connections.liked.length;
    const totalInteractions = totalRejected + totalLiked;
    const likedPercentage = `${(totalLiked / totalInteractions) || 0}%`;
    const { name } = currentUser;
    return {dateRating, looksRating, likedPercentage, name};
}

export default async function layout({ children }) {
    const session = await getServerSession(authOptions);
    const {dateRating, looksRating, likedPercentage, name} = await getData(session.userId.toString());
    return (
        <div className="mt-0">
            <DashboardHeader dateRating={dateRating} looksRating={looksRating} likedPercentage={likedPercentage} name={name} />
            {children}
        </div>
    );
};

//program rate of change in metrics in dashboard header with red or green arrow pointing up or down, tracked over 100-ish swipes
//by others
