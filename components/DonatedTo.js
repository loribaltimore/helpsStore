import CharityCard from '../../Explore/components/NewCharityCard';

function DonatedTo({currentUser}) {
    return (
        <div>
            {
                currentUser ?     
                    <div className="grid grid-cols-2 gap-8">
                        {
                            currentUser.charities.donations.map(function (element, index) {
                                let additionalStyle = (index % 2 !== 0) ? "mt-40" : "mb-20";

                                return (
                                    <div className={`col-span-1 ${additionalStyle}`} key={index}>
                                        <CharityCard org={element} cardType={'dashboard'} total={element.coinTotal * 5} liked={false} />
                                    </div>
                                )
                            })
                        }
                    </div> :
                        
                    <div className="text-center">
                        <h2 className="text-2xl">No Donations Yet!</h2>
                        <h5 className="text-lg">See What&apos;s Out There</h5>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded">Explore</button>
                    </div>
            }
        </div>
    )
};

export default DonatedTo;
