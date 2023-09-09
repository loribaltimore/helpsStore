
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
    .then(data => { return data }).catch(err => console.log(err));
  const allConnections = await activeUser.populate('connections.reciprocated').then(data => {
    return data.connections.reciprocated
  }).catch(err => console.log(err));
  activeUser.notifications.chat = [];
  await activeUser.save();
  return { activeUser, allConnections }
}
export default async function All(props) {
  const { activeUser, allConnections } = await getData();

  return (
    <AllChats allConnections={JSON.stringify(allConnections)}
      activeUser={JSON.stringify(activeUser)}
    />
  )
};