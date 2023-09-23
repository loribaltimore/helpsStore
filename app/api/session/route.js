import { NextResponse } from 'next/server';
import Session from 'models/sessionSchema';
import database from 'models/database';

export async function POST(request) {
    const { userId, item, value } = await request.json();
    await database();
    const currentSession = await Session.findOne({userId: userId}).then(data => {return data}).catch(err => console.log(err));
    currentSession[value] = item;
    await currentSession.save();
    console.log(currentSession);
    return NextResponse.json(currentSession);
}