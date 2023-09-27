import EveryOrgDonate from './EveryOrgDonate';
import CharityDescription from './CharityDescription';

function DonationSubPanel({ org, setCurrentQueue, currentPage, historyAmt, donation }) {
    let { orgs, transaction } = donation;
    let { amount } = transaction;
    let isFulfilled = donation.fulfillment.donation.fulfilled === true;
console.log(donation)
    let styles = {
        true: "p-2 bg-green-300",
        false: `p-2 bg-center bg-cover` 
    }

    return (
        <div className=' block mx-auto p-1'>
              <h4 className='text-center'>Donation</h4>
            <div className="flex space-x-3 p-5">
                <img src={org.img} className='w-[3rem] h-[3rem] rounded-full border-t border-b border-black object-cover object-center' />
                <div className='w-1/2'>
                <h2 className="text-xl font-extralight text-black">{org.name}</h2>
                <h2 className="text-xl font-extralight text-black">{org.ein}</h2>
                     <h3 className="font-extralight text-black">${org.coinTotal * 10}</h3>
                </div>
                                <EveryOrgDonate org={org} setCurrentQueue={setCurrentQueue} currentPage={currentPage} donation={donation} />
            </div>
            <hr/>
        </div>

    )
};

export default DonationSubPanel;


// registration and create user api route and function <=