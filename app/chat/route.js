import mongoose from 'mongoose';
import database from 'models/database';
import User from 'models/userSchema';
import { Server } from "socket.io";
import { NextResponse } from 'next/server';

export async function POST(req) {
    const io = new Server(4000, {});
io.on("connection", (socket) => {
  console.log('connected')
});
    return NextResponse.json({user: 'hello'});
};