"use client"
import DonationSlider from 'components/DonationSlider';
import TierProgress from 'components/TierProgress';
import LikedSlider from 'components/LikedSlider';

function NewHome({ user, donations }) {
    return (
        <div className="font-extralight p-10 w-full">
            <div className="grid grid-cols-2">
                <div className="col-span-1">
                    <div className="grid grid-cols-1">
                        <div className="col-span-1">
                            <h1 className='text-4xl'>{user.bio.firstName} {user.bio.lastName}</h1>
                        </div>
                        <div className="col-span-1">
                            <h3 className='text-xl'>Member Tier: {user.membership.tier}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="grid grid-cols-3">
                        <div className="col-span-2"></div>
                        <div className="col-span-1 text-center">
                            <h1 className="text-6xl mt-0 py-5">${user.membership.totalDonations * 10}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <TierProgress totalDonations={user.membership.totalDonations * 5} tier={user.membership.tier} />
            <div className="grid grid-cols-12 mt-2">
                <div className="col-span-12">
                <div className="w-full p-5">
                <div className="col-span-10 p-5">

                    <h1 className='text-4xl'>Donation History</h1> 
                </div>
                    <DonationSlider donations={donations} />
                    </div>
                    </div>
            </div>
            <div className="w-full p-5">
                <div className="col-span-12 p-5">
                    <h1 className='text-4xl'>Liked Charities</h1> 
                </div>
                    <LikedSlider liked={user.charities.liked.orgs} />
            </div>
        </div>
    )
};

export default NewHome
