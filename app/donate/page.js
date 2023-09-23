import database from 'models/database';
import User from 'models/userSchema';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AllDonation from 'components/AllDonation';

async function getData(userId) {
  await database();
        const currentUser = await User.findById(userId);

    // const currentUser = await User.findById("6509cfe69a9593fab11f4e56");
 return JSON.stringify(currentUser)
}

export default async function page() {
    const session = await getServerSession(authOptions);
  const currentUser = await getData(session.userId);
  return (
      <AllDonation user={currentUser} sessionCart={[]} />
  )
};

// starting with donate page, get it to render. Have to go through database to reconfigure for new project