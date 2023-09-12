"use client"
import Upgrade from 'components/Upgrade';
import BankThumbnail from 'components/BankThumbnail';
import AllProfiles from 'components/AllProfiles';
import Reviews from 'components/Reviews';
import { ReviewContext } from 'components/ReviewContext';
import { useState, useContext } from 'react';

export default function AllThumbnails({ allLikedBy, setAllLikedBy, membershipType, currentUser }) {
    const { showReviews, showUpgrade, bankConnection } = useContext(ReviewContext);
    const formattedLikedBy = allLikedBy.map((element, index) => {
        return element.user;
    });
    return (
        <div className='w-100 p-2'>
            <div className='absolute w-100 h-100 z-40 gap-4 mx-12'>
                
                    {
                        bankConnection || showUpgrade ?
                        showUpgrade ?
                            <div className='m-32'>
                                <Upgrade /> 
                                </div> :
                                <div className="min-w-[70.5rem]">
                                    <AllProfiles allMingles={[JSON.stringify(formattedLikedBy)]}
                                        currentUser={currentUser}
                                        isBank={false}
                                        isRev={true}
                                    />
                                </div> : null
}
            </div>
            
        <div className="grid grid-cols-5 grid-flow-cols gap-2 mt-10">
            {
                allLikedBy.length ?
                allLikedBy.map((connection, index) => { 
                    return <BankThumbnail connection={connection.user} currentUserPersonality={JSON.stringify(currentUser.personality)} index={index} key={index}  membershipType={membershipType} />
                })
                    : null
            }
            </div>
             </div>
    )
};
