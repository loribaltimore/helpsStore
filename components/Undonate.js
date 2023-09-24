import { MainContext } from 'components/MainContext';
import { CheckoutContext } from 'components/CheckoutContext';
import { useContext } from 'react';
import { updateCoin } from 'lib/updateCart';
import { createCart, CartItem, CartBuilder } from 'lib/createCart';

const findCoin = (toDonate, org, coinTotal) => {
    let totalSubtracted = 0;
    let updatedCharities = toDonate;
    const charitiesByName = toDonate.map(x => x.name);
console.log(coinTotal, 'COIN TOTAL');
     if (org.qty === 1) {
         updatedCharities = updatedCharities.filter(x => x.name !== org.name);
     } else {
         updatedCharities = toDonate.map(x => {
                if (x.name === org.name) {
                    x.qty -= 1;
                };
                return x;
            });
    };

    if (updatedCharities.length) {
        for (let i = 0; i < updatedCharities.length; i++) {    
                totalSubtracted -= 1 * updatedCharities[i].qty;
                console.log("IS");
                console.log(totalSubtracted);
            }
    } else {
        totalSubtracted = 1;
    }
    return {coin: coinTotal + totalSubtracted, charities: updatedCharities};
};

function Undonate({org, setAmt, amt}) {
    const { setCart, currentUser, cart } = useContext(MainContext);
    const { setChosenCharities, setTotalCoin, totalCoin } = useContext(CheckoutContext);

    // const currentCoin =
    //     cart.toDonate.length ?
    //         cart.toDonate.filter(x => x.name === org.name)[0].coinTotal > 2 : true;
    
    // const possibleCoin = {
    //     true: 1,
    //     false: 2
    // };

    const handleClick = async () => {
        console.log('CHARITY UN-DONATE IS CLICKED');
        const { coin, charities } = findCoin(cart.toDonate, org, totalCoin);
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
