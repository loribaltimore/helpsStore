import database from 'models/database';
import User from 'models/userSchema';
import Product from 'models/productSchema';
import ItemPage from 'components/ItemPage';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function getData(userId) {
    await database();
            let user = await User.findById(userId);
        // let user = req.user;
        let currentMembership = user.membership;
        let allProducts = await Product.find({}).then(data => {return data.filter(x => x.name !== 'Coin')});
        let coin = await Product.findOne({ name: 'Coin' });
    // let serverFlash = { type: undefined, message: undefined }
    return { allProducts, currentUserId: user._id, coin,  currentMembership };
}

export default async function page() {
    const session = await getServerSession(authOptions);
    let { allProducts, currentUserId, coin,  currentMembership } = await getData(session.userId);
    allProducts = JSON.stringify(allProducts);
    return (
        <div className='w-full p-5'>
            <ItemPage allProducts={allProducts} currentUserId={JSON.stringify(currentUserId)} coin={JSON.stringify(coin)} currentMembership={JSON.stringify(currentMembership)} />
        </div>
    )
}