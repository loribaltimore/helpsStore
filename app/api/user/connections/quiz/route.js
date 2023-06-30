import { NextResponse } from 'next/server';
import User from 'models/userSchema';

export async function POST(request) {
    console.log("ICEBREAKER IS WORKING");
    const { activeUserId, answers, connectionId, } = await request.json();
  const isCompatability =  await User.icebreaker(activeUserId, answers, connectionId);
    return NextResponse.json({isCompatability})
};