import Image from 'next/image'
import database from 'models/database';
import User from 'models/userSchema';
import AllProfiles from '@/components/AllProfiles';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { sortFunction } from '@/lib/userSorting';

async function getData() {
  await database();
  const session = await getServerSession(authOptions);
  const currentUser = await User.findById(session.userId.toString());
  const allMingles = await sortFunction(currentUser._id)
    .then(data => {
      return data
    }).catch(err => console.log(err));
 return {allMingles, currentUser}
}

export default async function page() {
  const { allMingles, currentUser } = await getData().then(data => { return data }).catch(err => console.log(err));
  return (
    <div >
      <AllProfiles allMingles={JSON.stringify(allMingles)} currentUser={JSON.stringify(currentUser)} />
    </div>
  )
};
