"use client"
import { signOut } from "next-auth/react"

export default function page() {
    return (
        <button
            className="mx-auto block bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
        >
            Sign Out
        </button>
    )
}