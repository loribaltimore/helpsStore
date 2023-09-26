import DonationSubPanel from '@/components/DonationSubPanel';
import PurchaseSubPanel from '@/components/PurchaseSubPanel';

function QueuePanel({ donation, setCurrentQueue, currentPage, historyAmt }) {
    console.log('THIS IS DONATION');
    console.log(donation);
    return (
        <div className="w-full space-y-5 h-full overflow-y-scroll text-black">
            <div className=" h-90%">
                <h1 className="text-3xl font-extralight p-5">{donation.user.firstName + ' ' + donation.user.lastName}</h1>
                <div className="flex p-3">
                    <div className="w-1/2 flex space-x-1 h-full overflow-x-scroll bg-white rounded p-10 border border-black">
                        {donation.orgs.map(function (element, index) {
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
                    <div className='my-auto'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-4xl">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
</svg>
                    </div>
                    <div className="w-1/2">
                        <PurchaseSubPanel donation={donation} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QueuePanel;
