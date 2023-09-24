"use client"
import { useState, createContext } from 'react';
export let SignUpContext = createContext();

export function SignUpProvider(props) {
    let [interests, setInterests] = useState(undefined);
    let [bio, setBio] = useState(undefined);
    let [shipping, setShipping] = useState(undefined);
    let [billing, setBilling] = useState(undefined);
    let [contact, setContact] = useState(undefined);
    let [auth, setAuth] = useState(undefined);

    return (
        <div>
            <SignUpContext.Provider value={{interests, setInterests, bio, setBio, shipping, setShipping, billing, setBilling, contact, setContact, auth, setAuth}} >
                {props.children}
            </SignUpContext.Provider>
        </div>
    )
};