import NewHome from 'components/NewHome';
import User from 'models/userSchema';
import database from 'models/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';


export async function getData(userId) {
    await database();
    // let user = req.user;
    const user = await User.findById(userId);
    let donatedTo = Object.fromEntries(user.charities.donatedTo);
    let items = user.charities.items;
    let likedCharities = user.charities.liked.orgs;
    // let { success } = req.query;
    // if (Object.keys(req.query).length > 0) {
    //     // req.session.flash = {};
    //     if (success !== undefined) {
    //         req.session.flash = { type: 'success', message: 'Purchase Successful!' }
    //         await addToQueue(req.session.cart)
    //             .then(data => { return data }).catch(err => console.log(err));
    //         req.session.cart = undefined;
    //     } else {
    //         req.session.flash = { type: 'error', message: 'Purchase Cancelled' };
    //     };
    // }

return { user, donations: donatedTo, items, likedCharities, flash:{type: undefined, message: undefined} }
}

export default async function page() {
        const session = await getServerSession(authOptions);

    const { user, donations, items, likedCharities, flash } = await getData(session.userId);

    return (
        <div className='w-100'>
    <NewHome user={user} donations={donations} items={items} likedCharities={likedCharities} serverFlash={flash} />
        </div>
    )
}

