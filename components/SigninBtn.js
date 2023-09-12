"use client"
import { signIn } from "next-auth/react";
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';

export default function SigninBtn({ providerId, providerName }) {
    const {setIsLoading} = useContext(ReviewContext);
    return (
        <button className="block mx-auto text-black border border-black w-2/3 rounded p-3"
            onClick={() => {
                 setIsLoading(true);
                    try {
                        signOut()
                    } catch {
                        console.log('error signing out');
                    } finally {
                        setIsLoading(false);
                    }
                signIn(providerId, providerName)
            }}
            ><span className="">Sign In</span></button>
    )
};