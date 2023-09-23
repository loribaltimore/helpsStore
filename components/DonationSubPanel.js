import EveryOrgDonate from './EveryOrgDonate';
import CharityDescription from './CharityDescription';

function DonationSubPanel({ org, setCurrentQueue, currentPage, historyAmt, donation }) {
    console.log(org);
    let { orgs, transaction } = donation;
    let { amount } = transaction;
    let isFulfilled = donation.fulfillment.donation.fulfilled === true;

    let styles = {
        true: "p-2 bg-green-300",
        false: `p-2 bg-center bg-cover` 
    }

    return (
        <div className='min-w-[15rem] h-full border border-black font-extralight text-black rounded'>
            <h4 className='text-center'>Donation</h4>
            <img src={org.img} className='w-full h-full border-t border-b border-black object-cover object-center'/>
                <div className=" text-md text-center py-1 ">{org.name.length <= 20 ? org.name : org.name.slice(0, 20)+'...'}</div>
            <div className="flex items-center">
            </div>
                    {/* <div className="w-1/2">
                                    <h3>Donation Amount: {amount.final * 5}</h3>
                                     <h3>Total Donated: {historyAmt}</h3>
                                </div> */}
            <div className=' w-1/2 block mx-auto'>
                
                <EveryOrgDonate org={org} setCurrentQueue={setCurrentQueue} currentPage={currentPage} donation={donation} />
         </div>
        </div>

    )
};

export default DonationSubPanel;


// registration and create user api route and function <=