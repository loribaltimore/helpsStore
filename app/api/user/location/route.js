import { NextResponse } from "next/server";

export async function POST(request) {
    console.log('WORKING');
    const res = await request.json();
    console.log(`${res.lat}, ${res.lng}`)
   const location = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${process.env.POSITION_STACK_API_KEY}&query=${res.lat}, ${res.lng}&limit=1`, {
        method: "GET",
   }).then(async data => {
       
       const res = await data.json();
       console.log(res)
       return res;
    }).catch(err => console.log(err));
    return NextResponse.json({location})
};