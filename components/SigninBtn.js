"use client"
import { signIn } from "next-auth/react";

export default function SigninBtn({providerId, providerName}) {

    return (
        <button onClick={() => signIn(providerId, providerName)}
        className="mx-auto block bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
            Sign in with {providerName}
          </button>
    )
};