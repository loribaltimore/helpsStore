import {NextResponse} from 'next/server';

export default async function POST(request) {
    const { } = await request.json();
    console.log('THIS IS HAPPENING')
    return NextResponse.json({message: 'success'});
};