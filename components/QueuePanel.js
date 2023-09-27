import DonationSubPanel from '@/components/DonationSubPanel';
import PurchaseSubPanel from '@/components/PurchaseSubPanel';

function QueuePanel({ donation, setCurrentQueue, currentPage, historyAmt }) {
    console.log(donation.orgs, donation.fulfillment.donation.fulfilled);
    const incompleteDonations = donation.orgs.filter((element, index) => {
        if (donation.fulfillment.donation.fulfilled.indexOf(element.ein) === -1) {
            return element
        };
    })
    return (
        <div className="w-1/2 space-y-5 h-full text-black">
            <div className="h-full">
                <h1 className="text-3xl font-extralight p-5">{donation.user.firstName + ' ' + donation.user.lastName}</h1>
                <div className="p-1 h-1/2">
                    {
                        !donation.fulfillment.order.fulfilled ?
                            <PurchaseSubPanel donation={donation} />
                            :
                            <div>
                                {incompleteDonations.map(function (element, index) {
                                    return (
                                        <DonationSubPanel
                                            org={element}
                                            setCurrentQueue={setCurrentQueue}
                                            currentPage={currentPage}
                                            historyAmt={historyAmt}
                                            donation={donation}
                                            key={index}
                                        /> 
                                    );
                                })}
                            </div> 
                    }
                </div> 
            </div>
        </div>
    );
}

export default QueuePanel;
