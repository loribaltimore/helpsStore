"use client"
import { useContext, useState } from 'react';
import { CheckoutContext } from 'components/CheckoutContext';
import { MainContext } from 'components/MainContext';
import Undonate from 'components/Undonate';

const findCoin = (toDonate, org, coinTotal) => {
    let totalSubtracted = 0;
    let updatedCharities = toDonate;
    let canCheckout = false;
    console.log('toDonate', toDonate);
    const charitiesByName = toDonate.map(x => x.name);

     if (charitiesByName.indexOf(org.name) < 0) {
         org.qty = 1;
         updatedCharities.push(org);
     } else {
         updatedCharities = toDonate.map(x => {
                if (x.name === org.name) {
                    x.qty += 1;
                };
                return x;
            });
    };
    
    // if (toDonate.length) {
        for (let i = 0; i < updatedCharities.length; i++) {
              totalSubtracted -= 1 * updatedCharities[i].qty;
        // };
    };
    console.log(updatedCharities);
    console.log(totalSubtracted);
    return {coin: coinTotal + totalSubtracted, charities: updatedCharities};
};

function CharityDonate({ org }) {
    let { totalCoin, setTotalCoin, chosenCharities, setChosenCharities } = useContext(CheckoutContext);
    const { cart } = useContext(MainContext);
    const [amt, setAmt] = useState(0);

    const handleClick = async () => {
        console.log('CHARITY DONATE IS CLICKED');
        const {coin, charities}= findCoin(chosenCharities, org, cart.total / 10);
        setTotalCoin(coin);
        setChosenCharities(charities);
    };
    return (
        <div className=' mx-auto block'>
<div className='flex w-100'>
                <Undonate org={org} cart={cart} setAmt={setAmt} amt={amt} />
            <div className='text-center'>
                <p className='text-6xl text-center py-2 px-5'>{amt}</p>
            </div>
        <button
                    className='block m-2 px-2 bg-white text-black rounded border border-black text-2xl hover:scale-110 transform transition-all active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => {
                        if (totalCoin > 0) {
                            setAmt(amt + 1);
                        handleClick();
                        }
                    }}
        >
            +
        </button>

    </div>
        </div>
        

    );
}

export default CharityDonate;
