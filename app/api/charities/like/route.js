import { NextResponse } from "next/server";
import User from 'models/userSchema';
import database from 'models/database';

export async function POST(request) {
    console.log('into like charity');
    await database();
    let { org, id, cause } = await request.json();
    console.log(org, id, cause);
    org.sort = 0;
    let currentUser = await User.findById(id);
    console.log(id);
        await currentUser.likeCharity(currentUser._id, org, cause).then(data => { return data }).catch(err => console.log(err));
    await currentUser.save();
    let allLiked = currentUser.charities.liked.orgs.map(x => x.name);
    return NextResponse.json({allLiked});
}
