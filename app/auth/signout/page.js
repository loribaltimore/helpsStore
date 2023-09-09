"use client"
import { signOut } from "next-auth/react"
import { GoogleLoginButton } from "react-social-login-buttons";
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';

export default function page() {
    const {setIsLoading} = useContext(ReviewContext);
    return (
        <div className="w-7/12 mx-auto py-24 space-y-10 block">
            <div className="font-extralight ">
                <h1 className="text-[5rem]">See you next time,</h1>
                <h2 className="text-[2rem] italic text-indigo-600">We'll miss you!</h2>
            </div>
            <div className="w-7/12 block mx-auto">
                <GoogleLoginButton text={'Sign Out'} onClick={() => {
                    setIsLoading(true);
                    try {
                        signOut()
                    } catch {
                        console.log('error signing out');
                    } finally {
                        setIsLoading(false);
                    }
                }} />
            </div>
    </div>
    )
};