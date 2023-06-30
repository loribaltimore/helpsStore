"use client"
import ChatBubble from 'components/ChatBubble';
import { io } from "socket.io-client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'
let socket;

export default function ChatWindow({ }) {
   const pathname = usePathname();
    const connectionId = pathname.split('/')[2];
    const {data: session } =  useSession();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        const asyncWrapper = async () => {

            await fetch('/api/socket')
                .then(data => console.log(data)).catch(err => console.log(err));
           

            socket = io(undefined, {
                path: '/api/socket.io',
            });

            socket.on('connect', () => {
                console.log('connected');
            });
        };
        asyncWrapper();
    } , [])

    const sendMessage = function () {
        const newMessage = {
            text: input, date: Date.now(),
            sender: session.userId, receiver: connectionId,
            read: false, delivered: true, liked: false
        }
        socket.emit('message', {newMessage, connectionId, userId: session.userId});
        const updatedMessages = messages;
        updatedMessages.push(newMessage);
        setMessages(prev => updatedMessages);
        setInput('');
        ref.current ?
        ref.current.scrollTop = ref.current.scrollHeight : null
    };
    return (
        <div className="relative  w-3/4 mx-auto rounded-xl border-gray-200 bg-white px-4 pt-2 sm:px-6 "
        onKeyDown={(event) => {
            if (event.key === 'Enter'
            && input.length > 0) {
                        sendMessage();
                    }
                }}
        >
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
                messages.length ? 
                    <div className="mx-auto block space-y-5 p-3 h-[32rem] overflow-scroll"
                ref={ref}
            >
                {
                    messages.map((message, index) => {
                        return <ChatBubble message={message} key={index} index={index} />
                    })
                }
                    </div> :
                    <div className='w-3/4 mx-auto rounded-lg my-auto p-3 h-[32rem]'>
                        <h1 className="text-center text-6xl text-black">No Messages</h1>
                        </div>
            }
            <div className="sticky bottom-0 flex mt-5 w-100 bg-white">
                    <div className='mx-auto w-1/2'>
                        <input placeholder="Type Message..." className="border-2 p-2 rounded w-3/4 text-black"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <button className="bg-indigo-500 p-2 rounded text-sm h-full"
                            onClick={() => sendMessage()}
                        >Send</button>
                    </div>
            </div>
    </div>
)
}
