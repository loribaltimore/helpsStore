"use client"
import { signOut } from "next-auth/react";

export default function Signout(){
    return (
        <div className="w-3/4 bg-white border relative x-20 border-black text-black rounded m-36 py-24 space-y-10 block">
            <div className="font-extralight">
                <h1 className="text-[5rem] text-center">Sign Out?</h1>
            </div>
            <button className="block mx-auto text-black border border-black w-2/3 rounded p-3"
            onClick={() => {
                    try {
                        signOut()
                    } catch {
                        console.log('error signing out');
                    } 
                }}
            ><span className="">Continue to Sign Out</span></button>
    </div>
    )
};

have to make sure registration is rendering in prod