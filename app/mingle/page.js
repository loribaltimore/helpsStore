import Image from 'next/image'
import database from 'models/database';
import User from 'models/userSchema';
import questions from '../../util/questions';
import FullQuiz from '@/components/FullQuiz';
import AllProfiles from '@/components/AllProfiles';


async function getData() {
  await database();
  const allMingles = await User.find({})
    .then(data => { return data }).catch(err => console.log(err));
  const currentUserId = allMingles[0].id;
 return {allMingles, currentUserId}
}

export default async function Pringle() {
  const {allMingles, currentUserId }= await getData().then(data => { return data }).catch(err => console.log(err));
  const randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <div >
      <AllProfiles allMingles={JSON.stringify(allMingles)} currentUserId={currentUserId} />
      <FullQuiz randomQuestions={randomQuestions} />
    </div>
  )
};