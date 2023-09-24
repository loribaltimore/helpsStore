"use client"
import { useContext } from 'react';
import { CheckoutContext } from 'components/CheckoutContext';
import NewCharityCard from 'components/NewCharityCard';
import ChooseCharity from 'components/ChooseCharity';
import CheckoutBtn from 'components/CheckoutBtn';
import ExplorePanel from 'components/ExplorePanel';
import DonationAlert from 'components/DonationAlert';
import { MainContext } from 'components/MainContext';

function NewCheckout({  }) {
    let { setTotalCoin, totalCoin, open, chosenCharities } = useContext(CheckoutContext);
    const {cart, currentUser} = useContext(MainContext);
    let { orgs } = JSON.parse(currentUser).charities.liked;

    totalCoin === undefined ? setTotalCoin(cart.total / 10) : '';

    return (
        <div className="p-10 h-full">

            {open === true && <DonationAlert />}

            <div className="flex justify-center items-center space-x-4">
                <div className="w-24 h-24 bg-goldenrod rounded-full"></div>
                <h1 className="text-6xl w-24 text-center">{totalCoin}</h1>
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