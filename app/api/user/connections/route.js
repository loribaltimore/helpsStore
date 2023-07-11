import { NextResponse} from "next/server";
import database from 'models/database';
import User from 'models/userSchema';
import Connection from 'models/connectionSchema';
import {getServerSession} from 'next-auth/next';
import { authOptions } from 'app/api/auth/[...nextauth]/route';


export async function PUT(request) {
  const { activeUserId, activeConnectionId, isDelete, isRead, connectionId, dateInvite } = await request.json();
         await database();
  const activeUser = await User.findById(activeUserId);
      const populatedConnection = await User.findById(connectionId || connection.currentUser._id);

   
  if (isDelete) {
    activeUser.connections.reciprocated = activeUser.connections.reciprocated.filter(connection => connection.id !== activeConnectionId);
    populatedConnection.connections.reciprocated = populatedConnection.connections.reciprocated.filter(connection => connection.id !== activeUserId);
    await activeUser.save();
    await populatedConnection.save();
    await Connection.findByIdAndDelete(activeConnectionId);
    let allConnections = activeUser.populate('connections.reciprocated');
    return NextResponse.json({
      message: "Deleted",
      allConnections: JSON.stringify(allConnections)
    });
  } else if (isRead) {
    //update isRead to true
  } else if (dateInvite) {
    console.log('DATE INVITE IS ACTIVE')
    const retrievedConnection = activeUser.connections.get(connectionId);
    activeUser.connections.set(connectionId, {
      id: connectionId,
      status: 'reciprocated',
      conversation: [...retrievedConnection.conversation],
      trivia: retrievedConnection.trivia,
      review: { dateInvite: true, date: Date.now().toString(), isShow: false }
    });
    // const connectionsConnection = populatedConnection.connections.get(activeUserId);
    // connectionsConnection.review = { dateInvite: true, date: Date.now(), isShow: false };
    // populatedConnection.connections.set(activeUserId, {
    //   id: activeUserId,
    //   status: connectionsConnection.status,
    //   conversation: connectionsConnection.conversation,
    //   trivia: connectionsConnection.trivia,
    //   review: connectionsConnection.review
    // });
    await activeUser.save();
    const inviteSent = !populatedConnection.connections.get(activeUserId).review.dateInvite;
    return NextResponse.json({ inviteSent });
   }
};

export async function POST(request) {
  let isMatched = false;
  await database();
    const {interested, userId, currentUserId, rating } = await request.json();
    const currentUser = await User.findById(currentUserId);
    const connection = await User.findById(userId);
  const preConnected = currentUser.connections.pending.indexOf(userId);
  await connection.rate(rating, userId);

    if (interested) {
        if (preConnected > -1) {
            //if connection already liked currentUser
           const newConnection = await new Connection({
            connection1:{name: currentUser.name, id: currentUser._id},
            connection2: {name: connection.name, id: userId},
           }).save();
          currentUser.connections.pending = currentUser.connections.pending.filter(connection => connection !== userId);
          currentUser.connections.reciprocated.push(newConnection.id);
          connection.connections.reciprocated.push(newConnection.id);
          console.log("ITS A MATCH");
          isMatched = JSON.stringify(connection);
          await currentUser.save();
          await connection.save();
          await newConnection.save();
        } else {
          console.log('JUST A LIKE');
          connection.connections.pending.push(userId);
        }
  };

  await User.interestAndPass(currentUserId, userId, interested ? 'interested' : 'pass');
    await currentUser.save();
  await connection.save();
    return NextResponse.json({ isMatched });
};


export async function GET(request) {
  await database();
  const session = await getServerSession(authOptions);
  const connectionId  = request.url.split('=')[1];
  const connection = await Connection.findById(connectionId);
  let activelyConnectedAs;
  let activelyConnectedWith;
  console.log('connection', connectionId)
  if (session.userId === connection.connection1.id) {
    activelyConnectedAs = 'connection1';
    activelyConnectedWith = 'connection2';
  } else {
    activelyConnectedAs = 'connection2';
    activelyConnectedWith = 'connection1';
  };
  const updatedConnection = connection;
  updatedConnection.activelyConnectedAs = activelyConnectedAs;
  updatedConnection.activelyConnectedWith = activelyConnectedWith;
  console.log('updatedConnection', updatedConnection);
  return NextResponse.json({
    connection: JSON.stringify(updatedConnection),
  })
}


// make sure map saves on PUT request for connections.review change/