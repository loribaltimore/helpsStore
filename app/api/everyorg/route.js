import Donation from 'models/donationSchema';
import database from 'models/database';
import {NextResponse} from 'next/server'

export async function POST(request) {
    await database();
    const { identifier, donationId } = await request.json();
    const currentDonation = await Donation.findById(donationId);
    currentDonation.fulfillment.donation.fulfilled.push(identifier);
    if (currentDonation.fulfillment.donation.fulfilled.length === currentDonation.orgs.length ) {
        currentDonation.fulfillment.donation.allFulfilled = true;
    };
    await currentDonation.save()
    return NextResponse.json({message: 'WORKED'});
};