"use client"
import { useContext, useState } from 'react';
import { CheckoutContext } from 'components/CheckoutContext';
import { MainContext } from 'components/MainContext';
import Undonate from 'components/Undonate';

const convertArrToObj = (chosenCharities) => {
    let obj = {};
    for (let i = 0; i < chosenCharities.length; i++) {
        obj[chosenCharities[i].name] = chosenCharities[i];
    };
    return obj;
}

const findCoin = (toDonate, org, coinTotal) => {
    let totalSubtracted = 0;
    let updatedCharities = toDonate;
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

    console.log(coinTotal - 1)
    return {coin: coinTotal - 1, charities: updatedCharities};
};

function CharityDonate({ org }) {
    let { totalCoin, setTotalCoin, chosenCharities, setChosenCharities } = useContext(CheckoutContext);
    const { cart } = useContext(MainContext);
    const [amt, setAmt] = useState(0);
    const charitiesObj = convertArrToObj(chosenCharities);
    console.log(charitiesObj);
    const handleClick = async () => {
        console.log('CHARITY DONATE IS CLICKED');
        const {coin, charities}= findCoin(chosenCharities, org, totalCoin);
        setTotalCoin(coin);
        setChosenCharities(charities);
    };
    return (
        <div className=' mx-auto block'>
<div className='flex w-100'>
                <Undonate org={charitiesObj[org.name]} setAmt={setAmt} amt={amt} />
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
