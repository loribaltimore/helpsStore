import { Server } from 'socket.io';
import { NextResponse } from 'next/server';
import User from 'models/userSchema';
import database from 'models/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await database();
    const { message } = req.body;
    const { sender, receiver } = message;

   const currentUser = await User.findById(sender);
    const connectedUser = await User.findById(receiver);

    const connectionMe = currentUser.connections.get(receiver);
    let conversationMe = connectionMe.conversation;

    let test = {
      id: connectionMe.id,
      conversation: [...conversationMe, message],
      trivia: connectionMe.trivia,
      jokes: {}, status:
      connectionMe.status,
    }
    currentUser.connections.set(receiver, test);
    console.log('THIS IS UPDATED CONNECTION');
    console.log(currentUser.connections.get(receiver));

    let connectionThem = connectedUser.connections.get(sender);
    let conversationThem = connectionThem.conversation;
    connectedUser.connections.set(sender, {
      id: connectionThem.id,
      status: connectionThem.status,
      conversation: [...conversationThem, message],
      trivia: connectionThem.trivia, jokes: {}
    });

    await currentUser.save().then(data => { console.log('THIS IS SAVED CONNECTION'); console.log(data.connections.get(receiver))}).catch(err => console.log(err));
    await connectedUser.save();
    return res.json({ messages: conversationMe });

  } else {
    if (res.socket.server.io) {
    } else {
      const io = new Server(res.socket.server, {
        path: "/api/socket.io",
        addTrailingSlash: false,
      })
      res.socket.server.io = io
    }
      res.socket.server.io.on('connection', socket => {
        socket.on('message', (message) => {
          if (!socket.adapter.rooms.has('1' + '2')) {
            console.log('JOINING');
            socket.join('1' + '2');
          } else {
            console.log('Already JOINED')
          }
          socket.emit('tester', message.newMessage);
        })
      });
    res.end();
    }
}

