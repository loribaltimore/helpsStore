let DonationQueue = require('../../models/donationQueueSchema');
// let Donation = require('../../models/donationSchema');

let addToHistory = async (currentDonation) => {
    console.log('ADD TO HISTORY IS WORKING');
    console.log(currentDonation);
    let { org, transaction } = currentDonation;
    let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' });
    await officialQueue.addToHistory(org.name, transaction.amount.final);
    await officialQueue.fulfillDonation(currentDonation._id);
};

module.exports = addToHistory;


//working on getting fulfilled orders to go to bottom of queue ;;;;;;;;;;