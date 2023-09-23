"use client"
import { createContext, useState } from 'react';

export let MainContext = createContext();

export function MainProvider(props) {
    const { currentUser, serverCart } = props;
    let [cart, setCart] = useState(serverCart);
    let [renderPool, setRenderPool] = useState(false);
    let [donators, setDonators] = useState(undefined);
    let [renderCart, setRenderCart] = useState(false);
    
    return (
        <div>
            <MainContext.Provider value={{
               currentUser, cart, setCart, setRenderPool, renderPool,
                setDonators, donators, renderCart, setRenderCart
            }}>
                {props.children}
            </MainContext.Provider>
        </div>
    )
};

