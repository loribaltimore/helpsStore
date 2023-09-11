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
            {bankConnection || showUpgrade?
                <div className='fixed top-5 left-92 z-50 min-w-[70rem]'>
                    {
                        showUpgrade ?
                            <div className='w-3/4 mx-auto'>
                                <Upgrade />
                                </div>
                             :
                                    <AllProfiles allMingles={JSON.stringify(formattedLikedBy)}
                                        setAllLikedBy={setAllLikedBy}
                                        currentUser={typeof currentUser !== 'string' ? JSON.stringify(currentUser) : currentUser}
                                        isBank={true}
                                    /> 
                    }
                </div>: null
}
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
