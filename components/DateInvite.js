"use client"
import { useState } from 'react';

export default function DateInvite({connection, dateInvite }) {
    const [isInvited, setIsInvited] = useState(false);
console.log(connection)
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
       }).then(async data => { const res = await data.json(); console.log(res); setIsInvited(res.inviteSent)}).catch(err => console.log(err));
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
        <div>
            {
               typeof dateInvite === 'number' ?
                    <button className="bg-indigo-500 px-3 py-2 rounded text-sm h-full"
                        //then create an isShow button in chat panel.
                        //create message that says something like "if your date refuses to acknowledge that they showed, leave the date."
                        //create a message that says "never meet somebody that refuses to accept your date request in the chat"
                        //if isShow is clicked by both parties, allow a review to be left.
                        onClick={() => {sendDateInvite(true)}}
                        >Date</button>
                    :
                    dateInvite || isInvited?
                        <button className="bg-orange-500 px-3 py-2 rounded text-sm h-full"
                        >Pending</button>
                        :
                        !dateInvite ?
                            <button className="bg-green-500 px-3 py-2 rounded text-sm h-full"
                                onClick={() => sendDataInvite(1)}
                            >Accept Date
                            </button>
                            :
                            typeof dateInvite === 'string' ?
                                <button className="bg-pink-500 px-3 py-2 rounded text-sm h-full"
                                >Showed</button>
                                : null

        }
    </div>
    )
}
