import { NextResponse} from "next/server";
import database from 'models/database';
import User from 'models/userSchema';
import {getServerSession} from 'next-auth/next';
import { authOptions } from 'app/api/auth/[...nextauth]/route';


export async function PUT(request) {
  const { activeUserId, connection, isDelete, isRead, connectionId } = await request.json();
   if (isDelete) {
  await database();
    const activeUser = await User.findById(activeUserId);
    const populatedConnection = await User.findById(connection.currentUser._id);
    activeUser.connections.delete(connection.currentUser._id);
    populatedConnection.connections.delete(activeUser.id);
  await activeUser.save();
    await populatedConnection.save();
    let allConnections = activeUser.connections;
  allConnections = [...allConnections.values()];
  allConnections = allConnections.filter(connection => connection.status === 'reciprocated');
  allConnections = await Promise.all(allConnections.map(async (connection, index) => {
  const populatedUser = await User.findById(connection.id);
    return { currentUser: populatedUser, conversation: connection.conversation }
  }))
    return NextResponse.json({
      message: "Deleted",
      allConnections: JSON.stringify(allConnections)
    });
   } else if (isRead) {
     const activeUser = await User.findById(activeUserId);
     const connection = await User.findById(connectionId);
   }
};

export async function POST(request) {
  let isMatched = false;
  await database();
    const {interested, userId, currentUserId, rating } = await request.json();
    const currentUser = await User.findById(currentUserId);
    const connection = await User.findById(userId);
  const preConnected = connection.connections.get(currentUserId);
  await connection.rate(rating, userId);

    if (interested) {
        if (preConnected) {
            //if connection already liked currentUser
          if (preConnected.status === 'liked') {
              connection.connections.set(currentUserId, { id: currentUserId, status: 'reciprocated', conversation: [], trivia: {}, jokes: {} });
              currentUser.connections.set(userId, { id: userId, status: 'reciprocated', conversation: [], trivia: {}, jokes: {} });
              console.log("ITS A MATCH");
              isMatched = JSON.stringify(connection);
            } else {
              connection.connections.delete(currentUserId);
            }
        } else {
            currentUser.connections.set(userId, { id: userId, status: 'liked', conversation: [], trivia: {}, jokes: {} });
          connection.connections.set(currentUserId, { id: currentUserId, status: 'pending', conversation: [], trivia: {}, jokes: {} });
          console.log('NOT A REJECTION, NOT A MATCH')
        }
    } else {
      console.log("REJECTED OR REJECTION")
        if (preConnected) {
            //if connection already liked currentUser
                connection.connections.delete(currentUserId);
        } else {
            currentUser.connections.set(userId, { id: userId, status: 'rejected', conversation: [], trivia: {}, jokes: {} });
        }
    };
    await currentUser.save();
  await connection.save();

    return NextResponse.json({ isMatched });
};


export async function GET(request) {
  await database();
  const session = await getServerSession(authOptions);
  console.log(request.url.split('=')[1])
  const connectionId  = request.url.split('=')[1];
  const currentUser = await User.findById(session.userId);
  const connection = await User.findById(connectionId);
  return NextResponse.json({
    allMessages: currentUser.connections.get(connectionId).conversation,
    connectionName: connection.name
  })
}

