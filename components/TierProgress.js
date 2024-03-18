import percentage from 'util/percentage';
function TierProgress({ totalDonations, tier }) {
    const tiers = {
        bottom: 0,
        low: 50,
        middle: 150,
        top: 250
    };

    const allTiers = Object.keys(tiers);
    const tierIndex = allTiers.indexOf(tier);

    const nextTier = tiers[allTiers[allTiers.indexOf(tier) + 1]];

    const progress = Math.floor((totalDonations / nextTier) * 100);
   console.log(progress, nextTier, tier, nextTier);
   console.log(allTiers.indexOf(tier) + 1)
    return (
        <div className='block w-3/4 mx-auto'>
        <div className="w-full flex relative mx-auto h-8 rounded my-2 border bg-green-100">
            {
                    percentage.map((element, index) => {
                        if (index * 1.25 <= progress) {
                            return element
                        } else {
                            return <div key={index*21} className="w-[2rem] h-100"></div>
                        }
                })
                }
            </div>
            <div className='mx-auto w-1/4'>
                {nextTier &&
                    <h2 className="">
                        ${nextTier - (totalDonations)} until {allTiers[tierIndex + 1]} tier
                    </h2>
                }
            </div>
                
            </div>

    );
};

export default TierProgress;
