"use client"
import ChatPanel from 'components/ChatPanel';
import { useState } from 'react';
import FullQuiz from 'components/FullQuiz';

export default function AllChats({ activeUser, allConnections }) {
    const [activeConnections, setActiveConnections] = useState(undefined);
    const [renderQuiz, setRenderQuiz] = useState(false);

    return (
        <div className='space-y-5'>
            {
                !renderQuiz ?
                activeConnections ?
          activeConnections.map((connection, index) => {
              return <ChatPanel connection={connection}
                  key={index} activeUser={JSON.parse(activeUser)}
                  setActiveConnections={setActiveConnections}
                  setRenderQuiz={setRenderQuiz}
                />
          }) :
                 JSON.parse(allConnections).map((connection, index) => {
                     return <ChatPanel connection={connection}
                         key={index} activeUser={JSON.parse(activeUser)}
                         setActiveConnections={setActiveConnections}
                            setRenderQuiz={setRenderQuiz}
                     />
                 })
                    :
                <FullQuiz matched={renderQuiz} setMatched={setRenderQuiz} />
        }
    </div>
)
}