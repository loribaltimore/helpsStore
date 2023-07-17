"use client"
import ChatBubble from 'components/ChatBubble';
import { io } from "socket.io-client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'
import DateInvite from 'components/DateInvite';
let socket;

export default function ChatWindow({ history, connection, dateInvite }) {
   const pathname = usePathname();
    const connectionId = pathname.split('/')[2];
    const {data: session } =  useSession();
    const [messages, setMessages] = useState(history || []);
    const [input, setInput] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        const asyncWrapper = async () => {

            await fetch('/api/socket', {method: 'GET'})
                .then(data => console.log(data)).catch(err => console.log(err));
            socket = io(undefined, {
                path: '/api/socket.io',
            });

            socket.on('connect', () => {
                console.log('connected');
            });

            socket.on('tester', (data) => {
                setMessages(prev => [...prev, data]);
            })
        };
        asyncWrapper();
    } , [])
    
    const sendMessage = async function () {
        const newMessage = {
            text: input, date: Date.now(),
            sender: session.userId,
            receiver: connectionId,
            connection: connection._id,
            read: false, delivered: true, liked: false
        }
        socket.emit('message', { newMessage, connectionId, userId: session.userId });

        await fetch('/api/socket', {
            method: "POST",
            body: JSON.stringify({message: newMessage}),
            headers: {'Content-Type': 'application/json'}
        }).then(async data => { const res = await data.json(); setMessages(res.messages)}).catch(err => console.log(err));

        setInput('');
        ref.current ?
        ref.current.scrollTop = ref.current.scrollHeight : null
    };
    return (
        <div className="relative  w-3/4 mx-auto rounded-xl border-gray-200 bg-white px-4 pt-2 sm:px-6 "
        onKeyDown={async (event) => {
            if (event.key === 'Enter'
            && input.length > 0) {
                       await sendMessage();
                    }
                }}
        >
            <div className='flex '>
        <Link className='text-indigo-500 p-2 rounded flex'
            href="/chat/all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="indigo" width="24" height="24">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M14 7l-5 5 5 5V7z"/>
                </svg>
                Back
                </Link>

                {
                    connection ?
                        <div className='w-1/2 mx-auto text-center'>
                    <h1 className="text-center text-2xl text-black">{connection[connection.activelyConnectedWith].name}</h1>
                </div> : ''
                }
            </div>

            {
               history || messages.length ? 
                    <div className="mx-auto block space-y-5 p-3 h-[32rem] overflow-scroll"
                ref={ref} >
                        {
                            session ?
                                messages.length ?
                            messages.map((message, index) => {
                                const { userId } = session;
                                const isLast = index === messages.length - 1 && message.sender === userId;
                                const secondToLast = index === messages.length - 2 && message.sender === userId;
                                const shouldRead = messages.length - 1 && !message.sender === userId;
                                return <ChatBubble message={message}
                                    key={index}
                                    secondToLast={secondToLast}
                                    isLast={isLast}
                                    isCurrentUser={message.sender === userId} />
                    }) : history.length ?
                            history.map((message, index) => {
                                const { userId } = session;
                                 const isLast = index === history.length - 1 && message.sender === userId;
                                const secondToLast = index === history.length - 2 && message.sender === userId;
                                 const shouldRead = messages.length - 1 && !message.sender === userId;
                                return <ChatBubble
                                    message={message}
                                    key={index}
                                    secondToLast={secondToLast}
                                    isLast={isLast}
                                    isCurrentUser={message.sender === userId} />
                    }) : null : null
                }
                    </div> :
                    <div className='w-3/4 mx-auto rounded-lg my-auto p-3 h-[32rem]'>
                        <h1 className="text-center text-6xl text-black">No Messages</h1>
                        </div>
            }
            <div className="sticky bottom-0 flex mt-5 w-100 bg-white space-x-5">
                    <div className='mx-auto w-3/4'>
                        <input placeholder="Type Message..." className="border-2 p-2 rounded w-3/4 text-black"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <button className="bg-indigo-500 p-2 rounded text-sm h-full"
                            onClick={() => sendMessage()}
                        >Send</button>
                </div>
                <div>
                    {
                        session ?
                            <DateInvite connection={connection} dateInvite={dateInvite} />
                        : null
                    }
            </div>
            </div>
            </div>
)
}

