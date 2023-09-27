"use client"
import { useSession } from "next-auth/react";
import { useState, useContext, useEffect } from 'react';
import { CheckoutContext } from './CheckoutContext';
import { useRouter } from 'next/navigation';

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
    const { data: session } = useSession();
    const { chosenCharities, setOpen, totalCoin } = useContext(CheckoutContext);
    const [userCanCheckout, setUserCanCheckout] = useState(false);
    const router = useRouter();
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

    const handleSubmit = async () => {
        if (session) {
            await fetch('/api/checkout_sessions', {
            method: 'POST',
            body: JSON.stringify({
                sessionId: session._id,
                cart: session.cart,
                toDonate: chosenCharities
            }),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            }
            }).then(async data => {
                data = await data.json();
                router.push(data)
            }).catch(err => console.log(err));
        }
    }

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
                <section style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', width: '400px', borderRadius: '6px', justifyContent: 'space-between' }}>
                    {!userCanCheckout ?
                        <div className='border border-black rounded p-2 text-center' onClick={(event) => handleClick(event)} onMouseOver={() => buttonStyle.opacity = '0.8'}>
                            Confirm Charities
                        </div>
                        :
                    <button style={{ ...buttonStyle, backgroundColor: 'green' }} onMouseOver={() => buttonStyle.opacity = '0.8'}
                        onClick={() => handleSubmit()}
                    >
                            Checkout
                        </button>
                    }
                </section>
        </div>
    );
};


