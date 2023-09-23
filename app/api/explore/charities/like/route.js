import { NextResponse } from "next/server";
import User from 'models/userSchema';
import database from 'models/database';


export async function POST(request) {
    await database();
     console.log('into like charity');
    let { org, id, cause } = await request.json();
    console.log(org, id, cause);
    org.sort = 0;
    // org.mongo_id = mongoose.Types.ObjectId();
    let currentUser = await User.findById(id);
   let updatedInterests = await currentUser.likeCharity(currentUser._id, org, cause).then(data => { return data }).catch(err => console.log(err));
    currentUser.charities.interests = updatedInterests;
    currentUser.charities.liked.orgs.push(org);
    await currentUser.save();
    let allLiked = currentUser.charities.liked.orgs.map(x => x.name);
    return NextResponse.json(allLiked);
}
export async function PUT() {
    
}