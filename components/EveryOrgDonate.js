import { useRouter } from 'next/navigation';
import updateSession from 'lib/updateSession';

function EveryOrgDonate({ org, donation }) {
    let identifier = undefined;
    let { ein, slug } = org;
    ein !== undefined ?
        identifier = ein : identifier = slug;

    let router = useRouter();

    let handleClick = async () => {
        await updateSession('currentDonation', donation).then(data => {
            router.push(`https://staging.every.org/${identifier}?frequency=ONCE&first_name=helps&last_name=LLC&partner_donation_id=${donation._id}&email=helps@gmail.com&amount=${org.coinTotal * 5}&success_url=http://localhost:3000/master?isSuccess=true`);
        }).catch(err => console.log(err));
    };
    return (
        <div className="py-5">
            {
                !donation.fulfillment.order.shipped ?
                        <button className="w-full bg-white border border-black ring ring-inset ring-blue-500 text-black p-2 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => handleClick()}>Donate</button>
                    :
                       <button className="w-full bg-white border border-black ring ring-inset ring-yellow-500 text-black p-2 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => handleClick()}>Done</button>

            }
        </div>
    )
};

export default EveryOrgDonate;
