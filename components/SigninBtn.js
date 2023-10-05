"use client"
import { signIn } from "next-auth/react";

export default function SigninBtn({ providerId, providerName }) {
    return (
        <button className="block mx-auto text-black bg-white drop-shadow-2xl w-1/2 opacity-70 rounded p-3 hover:scale-105 hover:opacity-100 active:scale-100"
            onClick={() => {
                    try {
                        signOut()
                    } catch {
                        console.log('error signing out');
                    }
                signIn(providerId, providerName)
            }}
            ><span className="">Sign In with Google</span></button>
    )
};