"use client"
import { useContext, useState } from 'react';
import { CheckoutContext } from 'components/CheckoutContext';
import { MainContext } from 'components/MainContext';
import Undonate from 'components/Undonate';

function CharityDonate({ org }) {
    let { totalCoin, setTotalCoin, chosenCharities,
        setChosenCharities, setOpen } = useContext(CheckoutContext);
    const { cart } = useContext(MainContext);
    const [amt, setAmt] = useState(0);
    const charitiesByName = chosenCharities.map(x => x.name);

    const handleClick = async () => {
        console.log('CHARITY DONATE IS CLICKED');
        if (totalCoin >= 2) {
            console.log('ONE')
            org.coin = 2;
            setTotalCoin(totalCoin - 2);
            let updatedCharities = chosenCharities;
            updatedCharities.push(org);
            setChosenCharities(updatedCharities);
        } else if (org.name === 'helps Pool') {
            console.log('TWO');
            org.coin = 1;
            console.log(totalCoin);
            setTotalCoin(totalCoin - 1);
            let updatedCharities = chosenCharities;
            updatedCharities.push(org);
            setChosenCharities(updatedCharities);
        } else {
            setOpen(true);
        }
    };

    let opacity = {
        true: '50%',
        false: '100%'
    };

    let isDisabled = totalCoin === 1 && org.name !== 'helps Pool' || totalCoin === 0;

    return (
        <div className=' mx-auto block'>
<div className='flex w-100'>
                <Undonate org={org} cart={cart} setAmt={setAmt} />
            <div className='text-center'>
                <p className='text-6xl text-center py-2 px-5'>{amt}</p>
            </div>
        <button
                    className='block m-2 px-2 bg-white text-black rounded border border-black text-2xl hover:scale-110 transform transition-all active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => {
                        setAmt(amt + 1);
                        handleClick();
                    }}
        >
            +
        </button>

    </div>
        </div>
        

    );
}

export default CharityDonate;
