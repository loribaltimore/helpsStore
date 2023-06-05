
// import Image from 'next/image'
import database from 'models/database';
import User from 'models/userSchema';
import AllChats from 'components/AllChats';

async function getData() {
  await database();
  const activeUser = await User.find({})
    .then(data => { return data[0] }).catch(err => console.log(err));
  let allConnections = activeUser.connections;
  allConnections = [...allConnections.values()];
  allConnections = allConnections.filter(connection => connection.status === 'reciprocated');
  allConnections = await Promise.all(allConnections.map(async (connection, index) => {
  const populatedUser = await User.findById(connection.id);
    return { currentUser: populatedUser, conversation: connection.conversation }
  }))
 return {activeUser, allConnections}
}

export default async function All(props) {
  const { activeUser, allConnections } = await getData();
  return (
      <AllChats allConnections={JSON.stringify(allConnections)} activeUser={JSON.stringify(activeUser)} />
  )
};