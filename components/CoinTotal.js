import { useContext } from 'react';
import { MainContext } from '../../Boilerplate/MainContext';
import TierProgress from './TierProgress';

function CoinTotal({currentUser}) {
    let { totalDonations, tier } = currentUser.membership;

    return (
        <div className="border border-black bg-white">
            {
                currentUser ?
                    <div className="grid grid-cols-2">
                        <div className="text-2xl text-center">
                            Total Donated: ${currentUser.membership.totalDonations * 5}
                        </div>
                        <div className="text-2xl text-center">
                            Membership Tier: {currentUser.membership.tier}
                        </div>
                    </div>
                    : ''
            }
            <TierProgress totalDonations={totalDonations} tier={tier} />
        </div>
    );
};

export default CoinTotal;
