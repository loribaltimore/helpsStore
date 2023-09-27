import Link from 'next/link';

function EveryOrgDonate({ org, donation }) {
    console.log(donation.fulfillment)
    let identifier = undefined;
    let { ein, slug } = org;
    ein !== undefined ?
        identifier = ein : identifier = slug;
    
    const handleClick = async () => {
        await fetch('/api/everyorg', {
            method: 'POST',
            body: JSON.stringify({
                identifier,
                donationId: donation._id,
                amt: org.coinTotal
            }),
            headers: {
                    'Content-Type': 'application/json'
                },
        }).then(async data => { return await data.json()}).catch(err => console.log(err))
    };
    return (
        <div className="w-full">
                    <Link href={`https://staging.every.org/${identifier}?frequency=ONCE&first_name=helps&last_name=LLC&partner_donation_id=${donation._id}&email=helps@gmail.com&amount=${org.coinTotal * 10}&success_url=http://localhost:3000/master?isSuccess=true#/donate`} className="w-full bg-white border border-black ring ring-inset ring-blue-500 text-black p-2 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => handleClick()}>Donate</Link>

        </div>
    )
};

export default EveryOrgDonate;
