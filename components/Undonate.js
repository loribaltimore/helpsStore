import { MainContext } from 'components/MainContext';
import { CheckoutContext } from 'components/CheckoutContext';
import { useContext } from 'react';

const findCoin = (toDonate, org, coinTotal) => {
    let totalSubtracted = 0;
    let updatedCharities = toDonate;
    console.log(coinTotal, 'COIN TOTAL');
    console.log(org.name);
    if (org.qty === 1) {
        console.log(org.qty)
        console.log('IS ONE')
         updatedCharities = updatedCharities.filter(x => x.name !== org.name);
    } else {
                console.log(org.qty)
        console.log('IS NOT ONE')
        updatedCharities = updatedCharities.map(x => {
                if (x.name === org.name) {
                    x.qty -= 1;
                  return x;
                } else {
                    return x
                }
            });
    };
    console.log(updatedCharities)
    return {coin: coinTotal + 1, charities: updatedCharities};
};

function Undonate({org, setAmt, amt}) {
    const { cart } = useContext(MainContext);
    const { setChosenCharities, setTotalCoin, totalCoin, chosenCharities } = useContext(CheckoutContext);

    const handleClick = async () => {
        console.log('CHARITY UN-DONATE IS CLICKED');
        const { coin, charities } = findCoin(chosenCharities, org, totalCoin);
        console.log(coin);
        setTotalCoin(coin);
        setChosenCharities(charities);
    };

    const size = {
        false: '12',
        true: '10'
    };

    return (
        <button
            className='block m-2 px-2 bg-white text-black rounded border border-black text-2xl  hover:scale-110 transform transition-all active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={() => {
                if (amt > 0) {
                   setAmt(amt - 1);
                handleClick();
                }
            }}
        >
            -
        </button>
    )
};

export default Undonate;
