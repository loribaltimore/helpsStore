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
    const {interested, userId, currentUserId } = await request.json();
    const currentUser = await User.findById(currentUserId);
    const connection = await User.findById(userId);
  const preConnected = connection.connections.get(currentUserId);
  

    if (interested) {
        if (preConnected) {
            //if connection already liked currentUser
            if (preConnected.status === 'liked') {
                connection.connections.set(currentUserId, { id: currentUserId, status: 'reciprocated', conversation: [] });
                currentUser.connections.set(userId, { id: userId, status: 'reciprocated', conversation: [] });
            } else {
                connection.connections.delete(currentUserId);
            }
        } else {
            currentUser.connections.set(userId, { id: userId, status: 'liked', conversation: [] });
            connection.connections.set(currentUserId, { id: currentUserId, status: 'pending', conversation: [] });
        }
    } else {
        if (preConnected) {
            //if connection already liked currentUser
                connection.connections.delete(currentUserId);
        } else {
            currentUser.connections.set(userId, { id: userId, status: 'rejected', conversation: [] });
        }
    };
    // await currentUser.save();
    // await connection.save();
    console.log(currentUser.connections);
    console.log(connection.connections);

    return NextResponse.json({ message: "Deleted" });
}