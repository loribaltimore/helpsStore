let mongoose = require('mongoose');
let { Schema, model, models } = mongoose;
// let { donationSchema } = mongoose;
let Donation = require('./donationSchema');

let donationQueueSchema = new Schema({
    name: {
        type: String,
        default: 'officialQueue'
    },
    queue: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation',
        }
    ],
    pool: {
        type: Map,
        of: Object,
        default: new Map()
    },
    history: {
        type: Map,
        of: Object,
        default: new Map()
    },
    spotlight: {
        type: Object
    },
    allTracking: [
        {
        type: String
        }
    ]
});


donationQueueSchema.method('removeFromQueue', async (donationId) => {
    let queue = await DonationQueue.findOne({ name: 'officialQueue' });
    console.log('QUEUE length')
    console.log(queue.queue.length);
    let index = queue.queue.indexOf(donationId);
    console.log(donationId);
    console.log(index);
    console.log(queue.queue[index]);

    
        
    let popQueue = await queue.populate('queue')
        .then(data => { return data.queue }).catch(err => console.log(err));
    popQueue[index].sort = 1;
    popQueue.sort((a, b) => {
        return b.sort - a.sort;
    });
    popQueue.shift();
    queue.queue = popQueue;
    await queue.save();
    console.log("QUEUE SHOULD BE");
    return queue;
});

donationQueueSchema.method('fulfillDonation', async (id) => {
    let currentDonation = await Donation.findById(id);
    currentDonation.fulfillment.donation.fulfilled = true;

    if (currentDonation.fulfillment.order.fulfilled === true
        && currentDonation.fulfillment.donation.fulfilled === true) {
        let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' });
        currentDonation.sort = officialQueue.queue.length;
        officialQueue.queue.sort((a, b) => a.sort - b.sort);
        await officialQueue.save();
    };
    await currentDonation.save();
});

donationQueueSchema.method('fulfillOrder', async (donationId, receiptNum, ordered, itemId) => {
    let currentDonation = await Donation.findById(donationId,);
    currentDonation.transaction.items = currentDonation.transaction.items.map(function (element, index) {
        let { name, price, config, img, code, sort, id, receiptNo, orderedFrom, received } = element;
        if (itemId === id) {
            return { name, price, config, img, code, sort, id, receiptNo: receiptNum, orderedFrom: ordered};
        } else {
            return { name, price, config, img, code, sort, id, receiptNo, orderedFrom, received }
        }
    });
    currentDonation.fulfillment.order.allReceipts.push(receiptNum);
    currentDonation.fulfillment.order.allOrderedFrom.push(ordered);
    await currentDonation.save();
    return currentDonation.transaction.items;
    
});

donationQueueSchema.method('shipped', async (donationId, tracking) => {
    let currentDonation = await Donation.findById(donationId);
    currentDonation.fulfillment.order.shipped = Date();
    currentDonation.fulfillment.order.tracking = tracking;
    await currentDonation.save();
    return {
        items: currentDonation.transaction.items,
        shipped: currentDonation.fulfillment.order.shipped === undefined
    };
});

donationQueueSchema.method('received', async (donationId, itemId) => {
    let currentDonation = await Donation.findById(donationId);
    let fulfilled = true;
    currentDonation.transaction.items = currentDonation.transaction.items.map(function (element, index) {
        let { id, name, price, config, img, code, sort, receiptNo, orderedFrom, received } = element;
        if (itemId === id) {
            return {id, name, price, config, img, code, sort, receiptNo, orderedFrom, received: new Date().toDateString() };
        } else {
            if (!received) {
                fulfilled = false;
            }
            return {id, name, price, config, img, code, sort, receiptNo, orderedFrom, received}
        };
    });
      if (fulfilled === true) {
          currentDonation.fulfillment.order.fulfillDate = new Date().toDateString();
          currentDonation.fulfillment.order.fulfilled = true;
              await currentDonation.save();
          return currentDonation.fulfillment.order.fulfilled;
    };
    await currentDonation.save();
    console.log('THIS IS ITEMS');
    console.log(currentDonation.transaction.items);
    return currentDonation.transaction.items;
});




donationQueueSchema.method('addToQueue', async (donationId) => {
    let queue = await DonationQueue.findOne({ name: 'officialQueue' });
    queue.queue.push(donationId);
    await queue.save();
});

donationQueueSchema.method('addToPool', async (amount, name, id) => {
    let queue = await DonationQueue.findOne({ name: 'officialQueue' });
    let currentDonator = queue.pool.get(id);
    currentDonator === undefined ?
        queue.pool.set(id, { amount, name }) : queue.pool.set(id, {amt: currentDonator.amt + amount, name});
    await queue.save();
});

donationQueueSchema.method('removeFromPool', async (amount, name, id) => {
    let queue = await DonationQueue.findOne({ name: 'officialQueue' });
    queue.pool.delete(id) 
    await queue.save();
})

donationQueueSchema.method('populateQueue', async () => {
    let queue = await DonationQueue.findOne({ name: 'officialQueue' });
    let popQueue = await queue.populate('queue')
        .then(data => { return data.queue.slice(0, 150) })
        .catch(err => console.log(err));
    return popQueue;
});

donationQueueSchema.method('addToHistory', async (org, amt) => {
    let queue = await DonationQueue.findOne({ name: 'officialQueue' });

    if (queue.history.get(org) === undefined) {
        console.log("SHOULD EXIST")
        queue.history.set(org, amt);
    } else {
        let getAmt = queue.history.get(org);
        console.log(getAmt);
        let newAmt = getAmt += amt;
        console.log('ADD OT HISTORY WORKING, NEW AMT SHOULD BE');
        console.log(newAmt);
        queue.history.set(org, newAmt);
    }; 

    await queue.save();

    return queue;
});

donationQueueSchema.virtual('poolTotal').get(function () {
    let obj = Object.fromEntries(this.pool);
    let arr = [];
    for (let el in obj) {
        arr.push(obj[el].amt);
    };
    return arr.reduce((a, b) => a + b);
});



module.exports = models.DonationQueue || model('DonationQueue', donationQueueSchema);


//You may want to add