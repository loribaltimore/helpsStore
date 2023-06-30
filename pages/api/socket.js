import { Server } from 'socket.io';

export default async function handler(req, res) {
  console.log('WORKING')
     if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
       const io = new Server(res.socket.server, {
   path: "/api/socket.io",
   addTrailingSlash: false
 })
       res.socket.server.io = io
  };

  res.socket.server.io.on('connection', socket => {
    socket.on('message', (message) => {
            socket.join(message.connectionId + message.userId);
            socket.to(message.connectionId + message.userId).emit('message', message.newMessage);
    })
  })
    res.end();
}

test live messaging;
