import { NextResponse } from "next/server";
import User from 'models/userSchema';
import Connection from 'models/connectionSchema';
import {getServerSession} from 'next-auth/next';
import { authOptions } from 'app/api/auth/[...nextauth]/route';

export async function POST(request) {
    const session = await getServerSession(authOptions);
    const { reviewText, reviewRating, connectionId, currentMongoConnectionId } = await request.json();
    const currentUser = await User.findById(session.userId.toString());
    const currentConnection = await User.findById(connectionId);
  const currentMongoConnection = await Connection.findById(currentMongoConnectionId);
  await currentConnection.rate(reviewRating, connectionId, currentUser.rating.date.avg, 'date');
  rating, userId, relativeUserRating, type
    const review = {
        rating: reviewRating,
        text: reviewText,
        reviewerId: currentUser._id.toString(),
        from: currentUser.name,
        connectionId: currentConnection._id.toString()
    };
   let activelyConnectedAs;
    let activelyConnectedWith;
    if (currentUser._id === currentMongoConnection.connection1.id) {
    activelyConnectedAs = 'connection1';
    activelyConnectedWith = 'connection2';
  } else {
     activelyConnectedAs = 'connection2';
    activelyConnectedWith = 'connection1';
  };
    currentMongoConnection.date.review[currentMongoConnection.activelyConnectedAs] = review;
  currentConnection.reviews = [...currentConnection.reviews, review];
  currentConnection.notifications.reviews.push({from: currentUser.name, text: reviewText, rating: reviewRating})
    await currentConnection.save();
    await currentMongoConnection.save();
    return NextResponse.json({allReviews: currentConnection.reviews})
};