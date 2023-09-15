"use client"
import ChatPanel from 'components/ChatPanel';
import { useState, useContext, useEffect } from 'react';
import FullQuiz from 'components/FullQuiz';
import Upgrade from 'components/Upgrade';
import AllProfiles from 'components/AllProfiles';
import { ReviewContext } from 'components/ReviewContext';

export default function AllChats({ activeUser, allConnections }) {
    const [activeConnections, setActiveConnections] = useState(undefined);
    const [renderQuiz, setRenderQuiz] = useState(false);
    const formattedConnections = JSON.parse(allConnections);
    const { setShowUpgrade, bankConnection } = useContext(ReviewContext);
    // useEffect(() => { 
    //     setIsLoading(true);
    //     setTimeout(() => {setIsLoading()}, 500);
    // }, [])

    return (
        <div className='block  mt-10'>
        <div className='block space-y-2 flex flex-wrap space-x-2'>
             <div className='absolute w-100 h-100 z-40 gap-4 mx-12'>
                    {
                        bankConnection ?
                            activeUser.membershipType === 'pro' ?
                                <Upgrade /> :
                                <div className="min-w-[70.5rem]">
                                    <AllProfiles allMingles={[JSON.stringify(formattedConnections)]}
                                        currentUser={JSON.parse(activeUser)}
                                        isBank={false}
                                        isRev={true}
                                    />
                                </div> : null
}
            </div>
            {
                !renderQuiz ?
                activeConnections ?
          activeConnections.map((connection, index) => {
              return <ChatPanel connection={connection}
                  key={index} activeUser={JSON.parse(activeUser)}
                  setActiveConnections={setActiveConnections}
                  setRenderQuiz={setRenderQuiz}
                  setShowUpgrade={setShowUpgrade}
                />
          }) :
                 formattedConnections.map((connection, index) => {
                     return <ChatPanel connection={connection}
                         key={index} activeUser={JSON.parse(activeUser)}
                         setActiveConnections={setActiveConnections}
                         setRenderQuiz={setRenderQuiz}
                         setShowUpgrade={setShowUpgrade}
                     />
                 })
                    :
                <FullQuiz connection={renderQuiz} setConnection={setRenderQuiz} />
        }
            </div>
        </div>
)
}