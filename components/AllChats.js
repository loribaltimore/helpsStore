"use client"
import ChatPanel from 'components/ChatPanel';
import { useState } from 'react';

export default function AllChats({ activeUser, allConnections }) {
    const [activeConnections, setActiveConnections] = useState(undefined);
    return (
        <div className='space-y-5'>
            {
                activeConnections ?
          activeConnections.map((connection, index) => {
              return <ChatPanel connection={connection}
                  key={index} activeUser={JSON.parse(activeUser)}
                  setActiveConnections={setActiveConnections} />
          }) :
                 JSON.parse(allConnections).map((connection, index) => {
                     return <ChatPanel connection={connection}
                         key={index} activeUser={JSON.parse(activeUser)}
                         setActiveConnections={setActiveConnections}  />
          })
        }
    </div>
)
}