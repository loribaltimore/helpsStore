"use client"
import { signOut } from "next-auth/react";

export default function Signout(){
    return (
        <div className="block mx-auto w-1/2  drop-shadow-2xl  text-black rounded mt-28 py-24 space-y-10 block">
            <div className="font-extralight">
                <h1 className="text-[5rem] text-center">Sign Out?</h1>
            </div>
        <button className="block mx-auto text-black bg-white drop-shadow-2xl w-1/2 opacity-70 rounded p-3 hover:scale-105 hover:opacity-100 active:scale-100"
            onClick={() => {
                    try {
                        signOut()
                    } catch {
                        console.log('error signing out');
                    } finally {
                    }
                }}
            ><span className="">Continue to Sign Out</span></button>
    </div>
    )
};


// have to make sure registration is rendering in prod