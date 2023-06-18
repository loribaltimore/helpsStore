import { NextResponse } from 'next/server';
import User from 'models/userSchema';
import Session from 'models/sessionSchema';
import database from 'models/database';
import { getServerSession } from 'next-auth/next';

export async function POST(request) {
    const { activeUserId, answers, connectionId } = await request.json();
    await database();
    const activeUser = await User.findById(activeUserId);
    await activeUser.icebreaker(activeUserId, answers, connectionId);
    return NextResponse.json({message: "Icebreaker Successful"})
};