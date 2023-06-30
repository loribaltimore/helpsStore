import mongoose from 'mongoose';
import database from 'models/database';
import User from 'models/userSchema';
import { Server } from "socket.io";
import { NextResponse } from 'next/server';

export async function GET(request) {
  console.log("SOCKET");
  console.log(NextResponse)
  const io = new Server(5000, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
  console.log(io);
  io.on('connection', socket => {
      socket.broadcast.emit('a user connected')
      socket.on('hello', msg => {
        socket.emit('hello', 'world!')
      })
    })
  // const io = new Server(4000, {
  //   cors: {
  //     origin: "http://localhost:4000"
  //   }
  // });
  // io.listen(4000);
  // await socket.connect();
    return NextResponse.json({user: 'hello'});
};