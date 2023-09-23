
import ConfigColor from 'components/ConfigColor';

function UnlockedColors({ tier, totalDonations }) {
    const tiers = {
        bottom: 0,
        low: 50,
        middle: 150,
        top: 250
    };

    const possibleColors = {
        bottom: ['yellow', 'green'],
        low: ['blue', 'orange'],
        middle: ['pink', 'tan'],
        top: ['white', 'black']
    };

    const allTiers = Object.keys(tiers);
    const tierIndex = allTiers.indexOf(tier);

    const nextTier = tierIndex < allTiers.length - 1 
                     ? tiers[allTiers[tierIndex + 1]] 
                     : null;

    return (
        <div className="flex space-x-10 w-3/4 text-black font-extralight">
            <div className="text-center">
                {nextTier && 
                  <h2 className="m-0 relative top-0.5">
                      ${nextTier - (totalDonations * 5)} until {allTiers[tierIndex + 1]} tier
                  </h2>
                }
            </div>
        </div>
    );
}

export default UnlockedColors;
