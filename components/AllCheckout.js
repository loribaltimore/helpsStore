"use client"
import { useContext } from 'react';
import { CheckoutContext } from 'components/CheckoutContext';
import NewCharityCard from 'components/NewCharityCard';
import CheckoutBtn from 'components/CheckoutBtn';
import ExplorePanel from 'components/ExplorePanel';
import DonationAlert from 'components/DonationAlert';
import { MainContext } from 'components/MainContext';

function NewCheckout({  }) {
    let { setTotalCoin, totalCoin, open } = useContext(CheckoutContext);
    const {cart, currentUser} = useContext(MainContext);
    let { orgs } = JSON.parse(currentUser).charities.liked;
    totalCoin === undefined ? setTotalCoin(cart.total / 10) : '';
    console.log(cart);
    return (
        <div className="p-32 h-full font-extralight">
            <p>Youre paying ${cart.total}</p>
            <p>Were paying the manufacturer ${cart.total / 4}</p>
            <p>Were paying ourselves ${cart.total / 4}</p>
            <p>Were helping you donate ${cart.total / 2}</p>
            {open === true && <DonationAlert />}

            <div className="flex justify-center items-center space-x-4">
                <h1 className="text-[10rem] text-center">{totalCoin} donations left</h1>
            </div>

            <div className="flex mt-10 w-full h-full">
                {orgs.map((element, index) => (
                    <NewCharityCard org={element} type={'purchase'} currentUser={currentUser} />
                ))}

                {orgs.length % 4 !== 0 && (
                    <ExplorePanel length={(4 - (orgs.length % 4))} />
                )}
            </div>
            <div className="flex justify-center mt-6">
                <CheckoutBtn cart={cart} />
            </div>
        </div>
    );
}

export default NewCheckout;

//separate the final coin update from the front end exprience of adding and subtracting coins with donate btn
//create okay looking summation of coin