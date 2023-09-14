import { NextResponse } from "next/server"
import database from 'models/database';
import User from 'models/userSchema';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import userSorting from '@/lib/userSorting';


export async function GET(request) {
    await database();
  const session = await getServerSession(authOptions);
  const currentUser = await User.findById(session.userId.toString());
  const { range, age, gender } = currentUser.preferences;
  const allMingles = await userSorting(gender, age, range, currentUser.location.geo.coordinates, currentUser._id)
    .then(data => {
      return data
    }).catch(err => console.log(err));
    return NextResponse.json({ allMingles, currentUser });
};