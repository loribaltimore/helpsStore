import mongoose from 'mongoose';
import database from '@/models/database';
import User from '@/models/userSchema';
import { Server } from "socket.io";


export async function GET(req, res) {
  await database();
  const thisUser = await User.find({});
  return NextResponse.json({user: thisUser});
};


