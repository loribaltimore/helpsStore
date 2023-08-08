"use client"
import ChatPanel from 'components/ChatPanel';
import { useState } from 'react';
import FullQuiz from 'components/FullQuiz';
import Upgrade from 'components/Upgrade';
import AllProfiles from 'components/AllProfiles';
import Reviews from 'components/Reviews';

export default function AllChats({ activeUser, allConnections }) {
    const [activeConnections, setActiveConnections] = useState(undefined);
    const [renderQuiz, setRenderQuiz] = useState(false);
    const formattedConnections = JSON.parse(allConnections);
    const [bankConnection, setBankConnection] = useState(undefined);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    return (
        <div className='space-y-5'>
             <div className='absolute w-100 h-100 z-40 grid grid-cols-3 gap-4 mx-12'>
                        <div className=''></div>
                {
                    bankConnection && showUpgrade?
                    activeUser.membershipType === 'pro'?
                            <Upgrade /> :
                            !showReviews ?
                                <div className='fixed z-40'>
                                <AllProfiles allMingles={[JSON.stringify(formattedConnections)]}
                                    currentUser={JSON.parse(activeUser)}
                                    isBank={false}
                                    isRev={true}
                                    setShowUpgrade={setShowUpgrade}
                                    isBankConnection={bankConnection}
                                    setShowReviews={setShowReviews}
                                    />
                                </div> : <Reviews /> : null
                        }
                <div className=''></div>
            </div>
            {
                !renderQuiz ?
                activeConnections ?
          activeConnections.map((connection, index) => {
              return <ChatPanel connection={connection}
                  key={index} activeUser={JSON.parse(activeUser)}
                  setActiveConnections={setActiveConnections}
                  setRenderQuiz={setRenderQuiz}
                  setBankConnection={setBankConnection}
                  setShowUpgrade={setShowUpgrade}
                />
          }) :
                 formattedConnections.map((connection, index) => {
                     return <ChatPanel connection={connection}
                         key={index} activeUser={JSON.parse(activeUser)}
                         setActiveConnections={setActiveConnections}
                         setRenderQuiz={setRenderQuiz}
                         setBankConnection={setBankConnection}
                         setShowUpgrade={setShowUpgrade}
                     />
                 })
                    :
                <FullQuiz connection={renderQuiz} setConnection={setRenderQuiz} />
        }
    </div>
)
}