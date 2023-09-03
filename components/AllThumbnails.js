"use client"
import Upgrade from 'components/Upgrade';
import BankThumbnail from 'components/BankThumbnail';
import AllProfiles from 'components/AllProfiles';
import Reviews from 'components/Reviews';
import { ReviewContext } from 'components/ReviewContext';
import { useState, useContext } from 'react';

export default function AllThumbnails({ allLikedBy, setAllLikedBy, membershipType, currentUser }) {
    const [bankConnection, setBankConnection] = useState();
    const { showReviews, showUpgrade } = useContext(ReviewContext);
    const formattedLikedBy = allLikedBy.map((element, index) => {
        return element.user;
    });
    return (
        <div className='w-100 p-2'>
            {bankConnection || showUpgrade?
                <div className='fixed top-5 left-92 z-50 min-w-[70rem]'>
                    {
                        showUpgrade ?
                            <Upgrade /> :
                            <div className='w-100'>
                                {!showReviews ?
                                    <AllProfiles allMingles={JSON.stringify(formattedLikedBy)}
                                        setAllLikedBy={setAllLikedBy}
                                        currentUser={typeof currentUser !== 'string' ? JSON.stringify(currentUser) : currentUser}
                                        isBank={true}
                                        setBankConnection={setBankConnection}
                                        isBankConnection={bankConnection}
                                    /> : <Reviews connection={bankConnection} />
                                }
                            </div>
                    }
                </div>: null
}
        <div className="grid grid-cols-5 grid-flow-cols gap-6">
            {
                allLikedBy.length ?
                allLikedBy.map((connection, index) => { 
                    return <BankThumbnail connection={connection.user} index={index} key={index} setBankConnection={setBankConnection} membershipType={membershipType} />
                })
                    : null
            }
            </div>
             </div>
    )
};