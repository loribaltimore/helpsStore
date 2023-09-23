import NewHome from 'components/NewHome';
import User from 'models/userSchema';
import database from 'models/database';

export async function getData() {
    await database();
    // let user = req.user;

    let user = await User.findById("6509cfe69a9593fab11f4e56");
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
    const { user, donations, items, likedCharities, flash } = await getData();

    return (
        <div className='w-100'>
    <NewHome user={user} donations={donations} items={items} likedCharities={likedCharities} serverFlash={flash} />
        </div>
    )
}

