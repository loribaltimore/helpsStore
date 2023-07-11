
// import Image from 'next/image'
import database from 'models/database';
import User from 'models/userSchema';
import Connection from 'models/connectionSchema';
import AllChats from 'components/AllChats';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';

async function getData() {
  await database();
  const session = await getServerSession(authOptions);
  const { userId } = session;
  const formattedId = userId.toString();
  const activeUser = await User.findById(formattedId)
    .then(data => {  return data }).catch(err => console.log(err));
  const allConnections = await activeUser.populate('connections.reciprocated').then(data => { return data.connections.reciprocated }).catch(err => console.log(err));
  console.log('allConnections' , allConnections)
  // allConnections = await Promise.all(allConnections.map(async (connection, index) => {
  //   const populatedUser = await User.findById(connection.id);
  //   const conversation = connection.conversation;
  //   const takeQuiz = !activeUser.connections.get(connection.id).trivia.me;
  //   const allTriviaAnswers = populatedUser.connections.get(formattedId).trivia ? populatedUser.connections.get(formattedId).trivia : {};
  //   const canReview = populatedUser.connections.get(formattedId).review.isShow === true
  //     && activeUser.connections.get(connection.id).review.isShow === true;
  //   const isInvited = populatedUser.connections.get(formattedId).review.dateInvite === true
  //     && activeUser.connections.get(connection.id).review.dateInvite === false;
  //   return { currentUser: populatedUser, conversation, takeQuiz, allTriviaAnswers, canReview, isInvited }
  // }))
 return {activeUser, allConnections}
}

export default async function All(props) {
  const { activeUser, allConnections } = await getData();

  return (
    <AllChats allConnections={JSON.stringify(allConnections)}
      activeUser={JSON.stringify(activeUser)}
    />
  )
};