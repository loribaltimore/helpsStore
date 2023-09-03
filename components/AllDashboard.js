"use client"
import DashboardWidget from 'components/DashboardWidget';
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import ProfileCard from './ProfileCard';

export default function AllDashboard({likedLineData, currentUser, looksMetrics, totalLikedBy, totalRejectedBy, passedLineData, matchedLineData, datedLineData}) {
    const { showProfile } = useContext(ReviewContext);
    console.log(typeof currentUser, 'currentUser');
    return (
        <div>
            {
                !showProfile ?
                    <div>

                    <div className='flex space-x-2'>
                        
                <div className="rounded-xl  text-center bg-white drop-shadow-lg w-1/2">
                <DashboardWidget looksMetrics={(looksMetrics)} />
            </div>
            
            <div className="bg-white rounded-xl text-cente w-1/2">
                            <DashboardWidget
                                likedLineData={likedLineData}
                    datedLineData={datedLineData}
                    matchedLineData={matchedLineData}
                    passedLineData={passedLineData}
                />
                            </div>
                        </div>

                    <div className='flex space-x-2'>

            <div className="rounded-xl text-center mx-auto w-1/2 p-5 drop-shadow-lg">
                <DashboardWidget likeRatio={{passed: totalRejectedBy, liked: totalLikedBy}} />
            </div>  
            <div className="rounded-xl text-center mx-auto w-1/2 p-5 drop-shadow-lg">
                <DashboardWidget pieDataTest={true} />
            </div>  
                        </div>
                        
                    </div> :
                    <div className='sticky top-10'>
                            <ProfileCard user={JSON.parse(currentUser)} currentUser={currentUser} />
                        </div>
            }

        </div>

    )
};