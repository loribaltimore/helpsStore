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
        true: 'bg-indigo-400',
        false: 'bg-blue-400'
    }
    console.log(isLast);
    console.log(secondToLast)
    return (
        <div className={`w-1/2  ${!isCurrentUser ? 'ml-auto' : null}`}>
            <div className={`rounded-lg  p-5 ${styles[isCurrentUser]}`}>
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
}