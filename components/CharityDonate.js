import { useContext } from 'react';
import { CheckoutContext } from 'components/CheckoutContext';
import { MainContext } from 'components/MainContext';
import Undonate from 'components/Undonate';

function CharityDonate({ org }) {
    let { totalCoin, setTotalCoin, chosenCharities,
        setChosenCharities, setOpen } = useContext(CheckoutContext);
    const { cart } = useContext(MainContext);
    
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
        <div className='flex space-x-2'>
        <button
            className='block m-2 p-2 bg-white text-black rounded border border-black mx-auto w-1/2'
            onClick={handleClick}
        >
            Donate
        </button>
         {
            charitiesByName.indexOf(org.name) > -1 ?
        <Undonate org={org} cart={cart} /> : null
        }
    </div>

    );
}

export default CharityDonate;
