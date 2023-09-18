"use client"
import DashboardWidget from 'components/DashboardWidget';
import DashboardOverview from './DashboardOverview';

export default function AllDashboard({likedLineData, currentUser, looksMetrics, passedLineData, matchedLineData, datedLineData}) {
    return (
        <div className='pb-12'>
                    <div>
                    <div className='flex space-x-2'>
                <div className="rounded bg-white text-center drop-shadow-lg w-1/2">
                <DashboardWidget looksMetrics={(looksMetrics)} />
            </div>
            
            <div className=" rounded bg-white text-center w-1/2">
                            <DashboardWidget
                                likedLineData={likedLineData}
                    datedLineData={datedLineData}
                    matchedLineData={matchedLineData}
                    passedLineData={passedLineData}
                />
                            </div>
                </div>
                <DashboardOverview user={JSON.parse(currentUser)} currentUser={currentUser} isCurrentUser={true}/>
                    </div> 
        </div>

    )
};