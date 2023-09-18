import DashboardHeader from "@/components/DashboardHeader"
import User from 'models/userSchema';
import  database  from 'models/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import calculateWeek from 'util/calculateWeek';

export async function getData(userId) {
    await database();
    const currentUser = await User.findById(userId);
    const currentWeek = calculateWeek();
        const dateRating = currentUser.rating.date.avg;
    const looksRating = currentUser.rating.looks.avg;
    const totalInteractedWith = currentUser.connections.pending.length + currentUser.connections.matched.length + currentUser.connections.rejectedBy.length;
    const totalLikedByPercentage = Math.round(((currentUser.connections.pending.length + currentUser.connections.matched.length) / totalInteractedWith) * 100);
    const { name } = currentUser;
    if (currentWeek !== currentUser.membership.week) {
        currentUser.membership.week = currentWeek;
        if (currentUser.rating.weekly.currentWeek.looks.rating !== currentUser.rating.looks.avg) {
            if (currentUser.rating.weekly.currentWeek.looks.rating > currentUser.rating.looks.avg) {
                currentUser.rating.weekly.currentWeek.looks.trend = 'down';
            } else {
              currentUser.rating.weekly.currentWeek.looks.trend = 'up';
            }
            currentUser.rating.weekly.lastWeek.looks.rating = currentUser.rating.weekly.currentWeek.looks.rating;
            currentUser.rating.weekly.currentWeek.looks.rating = currentUser.rating.looks.avg;
        } else {
            if (currentUser.rating.weekly.currentWeek.looks.trend !== 'none') {
                currentUser.rating.weekly.currentWeek.looks.trend = 'none';
            }
        }
        if (currentUser.rating.weekly.currentWeek.date.rating !== currentUser.rating.date.avg) {
            if (currentUser.rating.weekly.currentWeek.date.rating > currentUser.rating.date.avg) {
                currentUser.rating.weekly.currentWeek.date.trend = 'down';
            } else {
              currentUser.rating.weekly.currentWeek.date.trend = 'up';
            }
            currentUser.rating.weekly.lastWeek.date.rating = currentUser.rating.weekly.currentWeek.date.rating;
            currentUser.rating.weekly.currentWeek.date.rating = currentUser.rating.date.avg;
        } else {
            if (currentUser.rating.weekly.currentWeek.date.trend !== 'none') {
                currentUser.rating.weekly.currentWeek.date.trend = 'none';
            }
        };
        if (currentUser.connections.weekly.currentWeek.likedPercentage !== totalLikedByPercentage) {
            if (currentUser.connections.weekly.currentWeek.likedPercentage > totalLikedByPercentage) {
                currentUser.connections.weekly.currentWeek.trend = 'down';
            } else {
              currentUser.connections.weekly.currentWeek.trend = 'up';
            };
            currentUser.connections.weekly.lastWeek.likedPercentage = currentUser.connections.weekly.currentWeek.likedPercentage || 0;
            currentUser.connections.weekly.currentWeek.likedPercentage = totalLikedByPercentage;
        } else {
            if (currentUser.connections.weekly.currentWeek.trend !== 'none') {
                currentUser.connections.weekly.currentWeek.trend = 'none';
            }
        };
    };

    return {
        dateRating, looksRating, name, totalLikedByPercentage,
        looksTrend: currentUser.rating.weekly.currentWeek.looks.trend,
        dateTrend: currentUser.rating.weekly.currentWeek.date.trend,
        likedTrend: currentUser.connections.weekly.currentWeek.trend,
        photo: currentUser.photos[0]
    };
}

export default async function layout({ children }) {
    const session = await getServerSession(authOptions);
    const {dateRating, looksRating, name, totalLikedByPercentage, looksTrend, dateTrend, likedTrend, photo} = await getData(session.userId.toString());
    return (
        <div className="mt-0 p-5">
            <DashboardHeader dateRating={{ dateRating, dateTrend }}
                looksRating={{ looksRating, looksTrend }}
                likedPercentage={{ totalLikedByPercentage, likedTrend }}
                name={name}
                photo={photo}
            />
            {children}
        </div>
    );
};
