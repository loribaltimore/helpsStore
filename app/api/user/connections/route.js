import { NextResponse} from "next/server";
import database from 'models/database';
import User from 'models/userSchema';
import Connection from 'models/connectionSchema';
import {getServerSession} from 'next-auth/next';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getPhotos } from 'lib/getPhotos';

export async function PUT(request) {
  const { activeUserId, activeConnectionId, isDelete, isRead, connectionId, dateInvite, connectionObject } = await request.json();
         await database();
  const activeUser = await User.findById(activeUserId).populate('connections.reciprocated')
    .then(data => data).catch(err => console.log(err));
  const populatedConnection = await User.findById(connectionId || connection.currentUser._id);
  
  if (isDelete) {
    activeUser.connections.reciprocated = activeUser.connections.reciprocated.filter(connection => connection.id !== activeConnectionId);
    populatedConnection.connections.reciprocated = populatedConnection.connections.reciprocated.filter(connection => connection.id !== activeUserId);
    await activeUser.save();
    await populatedConnection.save();
    await Connection.findByIdAndDelete(activeConnectionId);
    let allConnections = await activeUser.populate('connections.reciprocated').then(data => {  return [...data.connections.reciprocated]}).catch(err => console.log(err));
    return NextResponse.json({
      message: "Deleted",
      allConnections: JSON.stringify(allConnections)
    });
  } else if (isRead) {
    //update isRead to true
  } else if (dateInvite) {
        const retrievedConnection = await Connection.findById(connectionObject);
    let inviteSent = false;
      if (typeof dataInvite !== 'number') {
        inviteSent = true
    retrievedConnection.date.invite.date = Date.now().toString();
    retrievedConnection.date.invite.sentBy = activeUserId;
    retrievedConnection.date.invite.sentTo = connectionId;
      } else {
        retrievedConnection.date.invite.accepted = true;
    }
        await retrievedConnection.save();
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
  await connection.rate(rating, userId, currentUser.rating.avg, 'looks');
    if (interested) {
        if (preConnected > -1) {
            //if connection already liked currentUser
           const newConnection = await new Connection({
            connection1:{name: currentUser.name, id: currentUser._id},
            connection2: {name: connection.name, id: userId},
           }).save();
          currentUser.connections.pending = currentUser.connections.pending.filter(connection => connection.toString() !== userId);
          currentUser.connections.reciprocated.push(newConnection.id);
          connection.connections.reciprocated.push(newConnection.id);
          currentUser.connections.matched.push(userId);
          connection.connections.matched.push(currentUserId);
          console.log("ITS A MATCH");
          await currentUser.save();
          await connection.save();
          await newConnection.save();
          isMatched = JSON.stringify({connection: newConnection, connectedAs: 'connection1', connectedWith: 'connection2'});
        } else {
          console.log('JUST A LIKE');
          connection.connections.pending.push(currentUserId);
          currentUser.connections.liked.push(userId);
        }
    } else {
      console.log('USER REJECTED');
      connection.connections.rejectedBy.push(currentUserId);
      currentUser.connections.rejected.push(userId);
      if (preConnected > -1) {
        currentUser.connections.pending = currentUser.connections.pending.filter((connection, index) => {
          if (connection.toString() !== userId) {
            return connection;
          }
        });
      };
  };

  await User.interestAndPass(currentUserId, userId, interested ? 'interested' : 'pass');
    await currentUser.save();
  await connection.save();
  let updatedLikedBy = await currentUser.populate('connections.pending')
    .then(data => { return data.connections.pending }).catch(err => console.log(err));
  const allPhotos = updatedLikedBy.map((element, index) => {
        return element.photos[0];
    })
    const allUserPhotos = await getPhotos(allPhotos);
    updatedLikedBy = updatedLikedBy.map((element, index) => {
        return {user: element, photoUrl: allUserPhotos[index]}
    })
    return NextResponse.json({ isMatched, isBank: updatedLikedBy });
};


export async function GET(request) {
  await database();
  const session = await getServerSession(authOptions);
  const connectionId  = request.url.split('=')[1];
  const connection = await Connection.findById(connectionId);
  let activelyConnectedAs;
  let activelyConnectedWith;
  let connectedTo;
  if (session.userId.toString() === connection.connection1.id) {
    connectedTo = await User.findById(connection.connection2.id);
    activelyConnectedAs = 'connection1';
    activelyConnectedWith = 'connection2';
  } else {
    connectedTo = await User.findById(connection.connection1.id);
    activelyConnectedAs = 'connection2';
    activelyConnectedWith = 'connection1';
  };
  let updatedConnection = JSON.stringify(connection);
  updatedConnection = JSON.parse(updatedConnection);
  updatedConnection.activelyConnectedAs = activelyConnectedAs;
  updatedConnection.activelyConnectedWith = activelyConnectedWith;
  return NextResponse.json({
    connection: JSON.stringify(updatedConnection),
    connectedTo: JSON.stringify(connectedTo)
  })
}

