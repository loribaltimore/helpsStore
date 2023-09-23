let mongoose = require('mongoose');
let { Schema, model } = mongoose;
let { donationQueueSchema } = mongoose;
let DonationQueue = mongoose.model('donationqueue', donationQueueSchema);
let { productSchema } = mongoose;
let Product = mongoose.model('product', productSchema);
// let {addToCart} = require('../../Cart/functions/updateCart');
// let updateSession = require('../../functions/updateSession');

let addToPool = async (cart) => {
    let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' });
    currentUser = await User.findById(cart.currentUser._id);
    await currentUser.addDontion(cart.pool, cart.currentUser._id);
    await officialQueue.addToPool(cart.pool,
        cart.currentUser.bio.firstName + ' ' + cart.currentUser.bio.lastName, cart.currentUser._id);
    return cart;
};

module.exports = addToPool;

