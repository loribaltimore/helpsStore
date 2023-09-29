import AllMaster from 'components/AllMaster';
import database from 'models/database';
import Product from 'models/productSchema';
import DonationQueue from 'models/donationQueueSchema';
import Donation from 'models/donationSchema';

export async function getData() {
    await database();
    const allProducts = await Product.find({}).then(data => { return data }).catch(err => console.log(err));
    const officialQueue = await DonationQueue.findOne({ name: 'officialQueue' }).then(data => { return data }).catch(err => console.log(err));
    const populatedQueue = await officialQueue.populate('queue').then(data => { return data.queue }).catch(err => console.log(err));
    return { allProducts, populatedQueue };
}


export default async function page() {
    const data = await getData();
    return (
        <AllMaster populatedQueue={JSON.stringify(data.populatedQueue)} allProducts={JSON.stringify(data.allProducts)}  />
    )
}