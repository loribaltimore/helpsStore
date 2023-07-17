import { NextResponse } from 'next/server';
import User from 'models/userSchema';
import Connection from 'models/connectionSchema';

export async function POST(request) {
    console.log("ICEBREAKER IS WORKING");
    const { activeUser, answers, connectionId, } = await request.json();
  const isCompatability =  await Connection.icebreaker(activeUser, answers, connectionId);
    return NextResponse.json({isCompatability})
};