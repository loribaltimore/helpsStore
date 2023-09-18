"use client"
import ChatBubble from 'components/ChatBubble';
import { useState, useRef} from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'
import DateInvite from 'components/DateInvite';
import Image from 'next/image';

export default function ChatWindow({history, connection, dateInvite, setDateInvite}) {
   const pathname = usePathname();
    const connectionId = pathname.split('/')[2];
    const {data: session } =  useSession();
    const [messages, setMessages] = useState(history || []);
    const [input, setInput] = useState('');
    const ref = useRef(null);
    
    const sendMessage = async function () {
        const newMessage = {
            text: input, date: Date.now(),
            sender: session.userId,
            receiver: connectionId,
            connection: connection._id,
            read: false, delivered: true, liked: false
        }
        setMessages(prev => [...prev, newMessage])
        setInput('');
        ref.current ?
        ref.current.scrollTop = ref.current.scrollHeight : null
    };
    return (
        <div className="mt-10 w-3/4 mx-auto rounded border-black bg-white px-4 pt-2 sm:px-6 "
            onKeyDown={async (event) => {
            if (event.key === 'Enter'
            && input.length > 0) {
                       await sendMessage();
                    }
                }}
        >
            <div className='flex w-100'>
                {
                    connection ?
                        <div className="p-5 w-full sm:flex">
                            <div className="flex space-x-2 w-3/4">
                                <div className="flex-shrink-0 ">
                        <img
                        // width={500}
                        // height={500}
                        src={`/api/user/photos/${connection[connection.activelyConnectedWith].photo}`}
                        alt="Interior of light green canvas bag with padded laptop sleeve and internal organization pouch."
                        className="w-[3rem] h-[3rem] rounded-full object-cover object-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                        />
            </div>
            <div className=" mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-4xl font-extralight text-gray-900">{connection[connection.activelyConnectedWith].name}</p>
                                </div>
                </div>
                            <DateInvite connection={connection}  dateInvite={dateInvite} setDateInvite={setDateInvite}/>
          </div>
                        : ''
                }
            </div>

            {
               history || messages.length ? 
                    <div className="relative border border-black rounded mx-auto block space-y-5 p-3 h-[32rem] overflow-scroll"
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
                        <div className='absolute bottom-2 flex w-full h-2/12 pr-5'>
                            <textarea className='w-full rounded text-black'
                                value={input}
                                onChange={(event) => {
                                    setInput(event.target.value);
                                }}
                            ></textarea>
                            <button className="hover:ring ring-[#02F3B0] ring-inset text-black border border-black w-1/4 h-100 rounded text-lg font-extralight "
                                onClick={() => {
                                    
                                    if (input.length) {
                                        sendMessage()
                                    }
                                }}
                        >Send</button>
                        </div>
                     </div> :
                    <div className='w-3/4 mx-auto rounded-lg my-auto p-3 h-[32rem]'>
                        <h1 className="text-center text-6xl text-black">No Messages</h1>
                        </div>
            }
            <div className="sticky bottom-0 flex mt-5 w-100 bg-white space-x-5">
                <div>
            </div>
            </div>
            </div>
)
}

