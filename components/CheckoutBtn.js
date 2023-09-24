"use client"
import { updateCoin } from 'lib/updateCart';
import { useState, useContext, useEffect } from 'react';
import { CheckoutContext } from './CheckoutContext';

const canCheckout = (totalCoin, chosenCharities) => {
    let canCheckout = true;
    if (totalCoin === 0) {
        for (let i = 0; i < chosenCharities.length; i++) {
        if (chosenCharities[i].qty < 2) {
            canCheckout = false;
            break;
        };
    };
    } else { canCheckout = false };
    return canCheckout;
}

export default function CheckoutBtn({ cart }) {
    const { chosenCharities, setOpen, totalCoin } = useContext(CheckoutContext);

    const [updatedCart, setUpdatedCart] = useState(undefined);
    const [userCanCheckout, setUserCanCheckout] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);
    
    const handleClick = async (event) => {
        canCheckout(totalCoin, chosenCharities) ? setUserCanCheckout(true) : setOpen(true);
    };

    const buttonStyle = {
        height: '36px',
        background: '#556cd6',
        borderRadius: '4px',
        color: 'white',
        border: '0',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)'
    };

    return (
        <div>
            <form action="/checkout" method="POST">
                {updatedCart !== undefined ? updatedCart.items.map((element, index) => (
                    <input name="cart[]" defaultValue={element.code + ':' + element.config.qty} key={index} hidden />
                )) : ''}
                <section style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', width: '400px', borderRadius: '6px', justifyContent: 'space-between' }}>
                    {!userCanCheckout ?
                        <div className='border border-black rounded p-2 text-center' onClick={(event) => handleClick(event)} onMouseOver={() => buttonStyle.opacity = '0.8'}>
                            Confirm Charities
                        </div>
                        :
                        <button type='submit' style={{ ...buttonStyle, backgroundColor: 'green' }} onMouseOver={() => buttonStyle.opacity = '0.8'}>
                            Checkout
                        </button>
                    }
                </section>
            </form>
        </div>
    );
};
