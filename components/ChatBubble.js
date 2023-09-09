import { useEffect } from 'react';

export default function ChatBubble({ message, isCurrentUser, isLast, secondToLast, shouldRead }) {

    useEffect(() => {
        const asyncWrapper = async () => { 
            await fetch('api/user/connections', {
                method: 'PUT',
                body: JSON.stringify({ isRead: true, connectionId: message.sender, activeUserId: message.receiver }),
                headaers: {
                    'Content-Type': 'application/json'
                }
            }).then(async data => {console.log(await data.json())}).catch(err => console.log(err));
        }
        if (shouldRead) {
            asyncWrapper();
        }
    })

    const styles = {
        true: 'bg-gray-200 text-black border border-black',
        false: 'text-black border border-black'
    }
    return (
        <div className={`w-1/2  ${!isCurrentUser ? 'ml-auto' : null}`}>
            <div className={`rounded p-5 ${styles[isCurrentUser]}`}>
                {message.text}
            </div>
            <p className={`text-xs ${secondToLast ? 'text-green-400' : 'text-red-400'} text-right`}>
                {
                    isLast ?
                            'Delivered'
                        : secondToLast ?
                            'Read'
                            : null
                        }
                </p>
        </div>
    )
};

//finish read receipts
//dashboard shows your reviews and interest/pass percentages
//incorporate paid feature to see what someones date rating is.
//ban phone number of users that don't let themselves be rated.