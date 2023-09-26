"use client"
import { createContext, useState } from 'react';

export let CheckoutContext = createContext();

export function CheckoutProvider(props) {
    let [chosenCharities, setChosenCharities] = useState([]);
    let [totalCoin, setTotalCoin] = useState(undefined);
    let [open, setOpen] = useState(false);
    const [amt, setAmt] = useState(0);

    return (
        <CheckoutContext.Provider value={{
            chosenCharities, setChosenCharities,
            totalCoin, setTotalCoin, open, setOpen,
            amt, setAmt
        }}>
            {props.children}
        </CheckoutContext.Provider>
    )
};

export default CheckoutContext;