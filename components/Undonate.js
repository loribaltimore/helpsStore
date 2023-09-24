import { MainContext } from 'components/MainContext';
import { CheckoutContext } from 'components/CheckoutContext';
import { useContext } from 'react';
import { updateCoin } from 'lib/updateCart';
import {createCart, CartItem, CartBuilder} from 'lib/createCart';

function Undonate({org, setAmt}) {
    const { setCart, currentUser, cart } = useContext(MainContext);
    const { setChosenCharities, setTotalCoin } = useContext(CheckoutContext);

    const currentCoin =
        cart.toDonate.length ?
            cart.toDonate.filter(x => x.name === org.name)[0].coinTotal > 2 : true;
    
    const possibleCoin = {
        true: 1,
        false: 2
    };
    console.log(currentUser._id, cart, org, possibleCoin[currentCoin]);

    const handleClick = async () => {
        console.log('CHARITY UN-DONATE IS CLICKED');
        console.log(cart)
            await updateCoin(currentUser._id, cart, org, possibleCoin[currentCoin])
                .then(data => {
                    console.log('COIN UPDATED'); console.log(data);
                    setCart(data); setChosenCharities(data.toDonate);
                    setTotalCoin(data.totalCoin)
                })
                    .catch(err => console.log(err));
    };

    const size = {
        false: '12',
        true: '10'
    };

    return (
        <button
            className='block m-2 px-2 bg-white text-black rounded border border-black text-2xl  hover:scale-110 transform transition-all active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={() => {
                setAmt(prev => prev - 1);
                handleClick();
            }}
        >
            -
        </button>
    )
};

export default Undonate;
