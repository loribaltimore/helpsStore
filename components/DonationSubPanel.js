import EveryOrgDonate from './EveryOrgDonate';

function DonationSubPanel({ org, setCurrentQueue, currentPage, donation }) {
    const handleClick = async () => {
        await fetch('/api/everyorg', {
            method: 'POST',
            body: JSON.stringify({
                identifier: 'helps',
                amt: org.coinTotal * 10,
            }),
            headers: {
                    'Content-Type': 'application/json'
                },
        }).then(async data => { return await data.json()}).catch(err => console.log(err))
    };
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
                {
                    org.name !== 'helps Pool' ?
                        <EveryOrgDonate org={org} setCurrentQueue={setCurrentQueue} currentPage={currentPage} donation={donation} />
                        :
                        <button className='p-1 border border-black'
                            onClick={() => {handleClick()}}
                        >Pool</button>
                }
            </div>
            <hr/>
        </div>

    )
};

export default DonationSubPanel;
