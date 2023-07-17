import { Server } from 'socket.io';
import { NextResponse } from 'next/server';
import User from 'models/userSchema';
import Connection from 'models/connectionSchema';
import database from 'models/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await database();
    const { message } = req.body;
    const { sender, receiver } = message;

   const currentUser = await User.findById(sender);
    const connectedUser = await User.findById(receiver);
    const connection = await Connection.findById(message.connection);
    connection.conversation.push(message);
    await connection.save();
    return res.json({ messages: connection.conversation });

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

