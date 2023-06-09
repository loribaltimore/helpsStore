import Image from 'next/image'
import database from 'models/database';
import User from 'models/userSchema';
import questions from '../../util/questions';
import FullQuiz from '@/components/FullQuiz';
import AllProfiles from '@/components/AllProfiles';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function getData() {
  await database();
  const session = await getServerSession(authOptions);
  const currentUser = await User.findById(session.userId.toString());
  const allMingles = await User.find({})
    .then(data => {
      return data
    }).catch(err => console.log(err));
 return {allMingles, currentUser}
}

export default async function Pringle() {
  const {allMingles, currentUser }= await getData().then(data => { return data }).catch(err => console.log(err));
  const randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <div >
      <AllProfiles allMingles={JSON.stringify(allMingles)} currentUser={JSON.stringify(currentUser)} />
      <FullQuiz randomQuestions={randomQuestions} />
    </div>
  )
};