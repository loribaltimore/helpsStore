
// import Image from 'next/image'
import database from 'models/database';
import User from 'models/userSchema';
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
  let allConnections = activeUser.connections;
  allConnections = [...allConnections.values()];
  allConnections = allConnections.filter(connection => connection.status === 'reciprocated');
  allConnections = await Promise.all(allConnections.map(async (connection, index) => {
    const populatedUser = await User.findById(connection.id);
    const conversation = connection.conversation;
    const takeQuiz = !activeUser.connections.get(connection.id).trivia.me;
    const allTriviaAnswers = populatedUser.connections.get(formattedId).trivia ? populatedUser.connections.get(formattedId).trivia : {};
    return { currentUser: populatedUser, conversation, takeQuiz, allTriviaAnswers }
  }))
 return {activeUser, allConnections}
}

export default async function All(props) {
  const { activeUser, allConnections } = await getData();

  return (
      <AllChats allConnections={JSON.stringify(allConnections)} activeUser={JSON.stringify(activeUser)} />
  )
};