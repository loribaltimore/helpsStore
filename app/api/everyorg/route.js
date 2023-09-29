import Donation from 'models/donationSchema';
import DonationQueue from 'models/donationQueueSchema';
import database from 'models/database';
import {NextResponse} from 'next/server'

export async function POST(request) {
    await database();
    const { identifier, donationId, amt } = await request.json();
    if (identifier === 'helps') {
        const officialQueue = await DonationQueue.findOne({ name: 'officialQueue' });
        officialQueue.pool += amt;
        officialQueue.totalDonated += amt;
        await officialQueue.save();
    };
    const currentDonation = await Donation.findById(donationId);
    currentDonation.fulfillment.donation.fulfilled.push(identifier);
    if (currentDonation.fulfillment.donation.fulfilled.length === currentDonation.orgs.length) {
        currentDonation.fulfillment.donation.allFulfilled = true;
    };
    await currentDonation.save()
    return NextResponse.json({message: 'WORKED'});
};