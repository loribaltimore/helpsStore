import { NextResponse } from "next/server";
import User from 'models/userSchema';
import database from 'models/database';


export async function GET (request, params) {
    let { charityName } = params.params;
    let response = await fetch(`https://partners.every.org/v0.2/search/${charityName}?apiKey=${process.env.CHARITY_API_KEY}`,
        {
        method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
    }).then(async data => { data = await data.json(); console.log(data); return data }).catch(err => console.log(err));
    return NextResponse.json(response);
};