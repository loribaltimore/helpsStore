"use client"
import ChatPanel from 'components/ChatPanel';
import { useState, useContext } from 'react';
import FullQuiz from 'components/FullQuiz';
import Upgrade from 'components/Upgrade';
import AllProfiles from 'components/AllProfiles';
import Reviews from 'components/Reviews';
import { ReviewContext } from 'components/ReviewContext';

export default function AllChats({ activeUser, allConnections }) {
    const [activeConnections, setActiveConnections] = useState(undefined);
    const [renderQuiz, setRenderQuiz] = useState(false);
    const formattedConnections = JSON.parse(allConnections);
    const [currentMongoConnection, setCurrentMongoConnection] = useState(undefined);
    const { showReviews, setShowUpgrade, bankConnection } = useContext(ReviewContext);
    return (
        <div className='block mx-auto'>
        <div className=' space-y-2 flex flex-wrap space-x-2'>
             <div className='absolute w-100 h-100 z-40 gap-4 mx-12'>
                        <div className=''></div>
                {
                    bankConnection ?
                    activeUser.membershipType === 'pro'?
                            <Upgrade /> :
                            <div className={`${!showReviews ? 'fixed': ''} z-40`}>
                                {
                                    !showReviews ?
                                    <AllProfiles allMingles={[JSON.stringify(formattedConnections)]}
                                        currentUser={JSON.parse(activeUser)}
                                        isBank={false}
                                            isRev={true}
                                    /> : <Reviews 
                                        currentMongoConnection={currentMongoConnection}
                                        connection={JSON.stringify(bankConnection)} />}
                                </div>  : null
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
                  setShowUpgrade={setShowUpgrade}
                  setCurrentMongoConnection={setCurrentMongoConnection}
                />
          }) :
                 formattedConnections.map((connection, index) => {
                     return <ChatPanel connection={connection}
                         key={index} activeUser={JSON.parse(activeUser)}
                         setActiveConnections={setActiveConnections}
                         setRenderQuiz={setRenderQuiz}
                         setShowUpgrade={setShowUpgrade}
                         setCurrentMongoConnection={setCurrentMongoConnection}
                     />
                 })
                    :
                <FullQuiz connection={renderQuiz} setConnection={setRenderQuiz} />
        }
            </div>
        </div>
)
}