import mongoose from 'mongoose';
import database from 'models/database';
import User from 'models/userSchema';
import { NextResponse } from 'next/server';


export async function GET(request) {
  
 
    return NextResponse.json({user: 'hello'});
};