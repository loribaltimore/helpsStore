import { NextResponse} from "next/server";
import database from 'models/database';
import User from 'models/userSchema';

export async function PUT(request) {
  const { activeUserId, connection, isDelete } = await request.json();
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
              isMatched = true;
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
  console.log('AFTER');
  console.log(currentUser.connections.get(userId));
  console.log(connection.connections.get(currentUserId));

    return NextResponse.json({ isMatched });
}