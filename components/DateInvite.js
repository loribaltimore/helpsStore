"use client"
import { useState } from 'react';

export default function DateInvite({ connectionId, activeUserId, dateInvite }) {
    const [isInvited, setIsInvited] = useState(false);

   const sendDateInvite = async () => {
       await fetch('/api/user/connections', {
           method: 'PUT',
           body: JSON.stringify({
               dateInvite: true,
               connectionId,
               activeUserId,
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(async data => { const res = await data.json(); console.log(res); setIsInvited(res.inviteSent)}).catch(err => console.log(err));
    };
   const sendIsShow = async () => {
       await fetch('/api/user/connections', {
           method: 'PUT',
           body: JSON.stringify({
               isShow: true,
               connectionId,
               activeUserId,
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(data => console.log(data)).catch(err => console.log(err));
   };
    
    return (
        <div>
            {
                !dateInvite.me  && !dateInvite.them && !isInvited?
                    <button className="bg-indigo-500 px-3 py-2 rounded text-sm h-full"
                        //then create an isShow button in chat panel.
                        //create message that says something like "if your date refuses to acknowledge that they showed, leave the date."
                        //create a message that says "never meet somebody that refuses to accept your date request in the chat"
                        //if isShow is clicked by both parties, allow a review to be left.
                        onClick={() => {sendDateInvite()}}
                        >Date</button>
                    :
                    dateInvite.me === true && !dateInvite.them || isInvited?
                        <button className="bg-orange-500 px-3 py-2 rounded text-sm h-full"
                        >Pending</button>
                        :
                        !dateInvite.me && dateInvite.them ?
                            <button className="bg-green-500 px-3 py-2 rounded text-sm h-full"
                            >Accept Date</button>
                            :
                            dateInvite.me && dateInvite.them ?
                                <button className="bg-pink-500 px-3 py-2 rounded text-sm h-full"
                                >Showed</button>
                                : null

        }
    </div>
    )
}


dateInvite takes in the dateInvite prop from ChatWindow. reformat that prop with informtion necessary to maintain functionality