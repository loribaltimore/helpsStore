import mongoose from 'mongoose';
let { Schema, model } = mongoose;
// let { donationQueueSchema, donationSchema } = mongoose;
import DonationQueue from 'models/donationQueueSchema';
import Donation from 'models/donationSchema';
import database from 'models/database';

import { NextResponse} from 'next/server';

export async function GET(req, res) {
    await database();
    const url = new URL(req.url)

  const offset = url.searchParams.get("offset")
  const limit = url.searchParams.get("limit")
  const search = url.searchParams.get("search")
    const filter = url.searchParams.get("filter");

    let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' })
    .then(data => { return data }).catch(err => console.log(err));
    let { queue } = officialQueue;
    
    if (search === undefined) {
        let queuePop = [];
        let slicedQueue = queue.slice(parseInt(offset), parseInt(limit));
        for (let i = 0; i < slicedQueue.length; i++){
            await Donation.findById(slicedQueue[i].toString())
                .then(data => {queuePop.push(data) }
                ).catch(err => console.log(err));
        };
         return NextResponse.json({queuePop}); 
    } else {
        let queuePop = await officialQueue.populate('queue')
            .then(data => { return data.queue }).catch(err => console.log(err));
        let searchFor = new RegExp(search, 'i');
            let searchTerm;
        let searchResults = queuePop.filter(function (element, index) {
            let { user, fulfillment } = element;
                    console.log(fulfillment)

            switch (filter) {
                case 'Name': searchTerm = user.firstName + ' ' + user.lastName;
                    break;
                case 'Receipt': searchTerm = fulfillment.order.allReceipts.join('');
                    break;
                case 'Manufacturer': searchTerm = fulfillment.order.allOrderedFrom.join('');
                    break;
                case 'Tracking': searchTerm = fulfillment.order.tracking;
                    break;
            }
            if (searchFor.test(searchTerm) === true) {
                        console.log('IS TRUE')
                        return element;
                    };
        });
        return NextResponse.json({searchResults});
    }
};

export async function POST(req) {
    let { receiptNo, orderedFrom, donationId, itemId, type, tracking } = await req.json();
    let officialQueue = await DonationQueue.findOne({ name: 'officialQueue' });
    let response = undefined;
    switch (type) {
        case 'purchase':
            console.log('IN PURCHASE')
            response = await officialQueue.fulfillOrder(donationId, receiptNo, orderedFrom, itemId).then(data => { console.log(data);  return data}).catch(err => console.log(err));
            break;
        case 'received':
            console.log('IN RECIECED')
           response = await officialQueue.received(donationId, itemId).then(data => { console.log(data);  return data}).catch(err => console.log(err));
            break;
        case 'shipped':
            console.log('IN SHIPPED')
           response = await officialQueue.shipped(donationId, tracking).then(data => { console.log(data);  return data}).catch(err => console.log(err));
            break;
    };

    return NextResponse.json({response});
};
