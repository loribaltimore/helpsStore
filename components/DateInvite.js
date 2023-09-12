"use client"
import { useState } from 'react';
import Link from "next/link";

export default function DateInvite({connection, dateInvite, setDateInvite }) {
    const [isInvited, setIsInvited] = useState(false);
    const sendDateInvite = async (type) => {
       await fetch('/api/user/connections', {
           method: 'PUT',
           body: JSON.stringify({
               dateInvite: type,
               connectionObject: connection._id,
               connectionId: connection[connection.activelyConnectedWith].id,
               activeUserId: connection[connection.activelyConnectedAs].id,
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(async data => { const res = await data.json()}).catch(err => console.log(err));
    };
   const sendIsShow = async () => {
       await fetch('/api/user/connections', {
           method: 'PUT',
           body: JSON.stringify({
               isShow: true,
               connectionId: connection[connection.activelyConnectedWith].id,
               activeUserId: connection[connection.activelyConnectedAs].id,
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(data => console.log(data)).catch(err => console.log(err));
   };
    //dateInvite = true = accept date
    //dateInvite = false  = you sent request
    //dateInvite = 'accepted' = date accepted
    //dateInvite = 0 = date request not sent
    return (
        <div className='flex space-x-2 font-extralight'>
            <Link href="/chat/all" className='text-black border border-black py-2 px-3 rounded hover:ring ring-[#02F3B0] ring-inset'
            >Back</Link>
            {
               typeof dateInvite === 'number' ?
                    <button className="hover:ring ring-[#02F3B0] ring-inset text-black border border-black px-3 py-2 rounded text-sm h-full"
                        //then create an isShow button in chat panel.
                        //create message that says something like "if your date refuses to acknowledge that they showed, leave the date."
                        //create a message that says "never meet somebody that refuses to accept your date request in the chat"
                        //if isShow is clicked by both parties, allow a review to be left.
                        onClick={() => {
                            setIsInvited(true);
                            sendDateInvite(true);
                            setDateInvite('string');
                        }}
                        >Send Date Invite</button>
                    :
                    dateInvite || isInvited?
                        <button className=" text-black border border-black px-3 py-2 rounded text-sm h-full"
                        >Invite Pending</button>
                        :
                        !dateInvite ?
                            <button className="hover:ring ring-[#02F3B0] text-black border border-black px-3 py-2 rounded text-sm h-full"
                                onClick={() => sendDataInvite(1)}
                            >Accept Date
                            </button>
                            :
                            typeof dateInvite === 'string' ?
                                <button className="text-black border border-black px-3 py-2 rounded text-sm h-full"
                                >Date Showed</button>
                                : null

        }
    </div>
    )
}
