"use client"
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import calculateDistance from '@/util/calculateDistance';
import Matched from 'components/Matched';
import Reviews from 'components/Reviews';

export default function AllProfiles({ allMingles, setAllLikedBy, currentUser, isBank, setShowUpgrade, isBankConnection, isRev, setShowReviews,}) {
    const [counter, setCounter] = useState(0);
    const [connection, setConnection] = useState(false);
    allMingles = JSON.parse(allMingles);
    const currentUserFormatted = typeof currentUser === 'String' ? JSON.parse(currentUser) : currentUser;
    const currentMingle = isBankConnection || allMingles[counter] || undefined;
    
    if (currentMingle) {
        console.log(currentMingle.location.geo.coordinates)
        calculateDistance(currentMingle.location.geo.coordinates, currentUserFormatted.location.geo.coordinates);
    } else {
        console.log(currentMingle)
    }

    return (
        <div>
            {
                connection ?
                    <Matched connection={connection} setConnection={setConnection} />
                    :
                        <ProfileCard user={currentMingle} setCounter={setCounter}
                            currentUser={typeof currentUser === 'String' ? currentUser : JSON.stringify(currentUser)} distance={distance}
                            setConnection={setConnection}
                            isBank={isBank}
                            isRev={isRev}
                            setShowUpgrade={setShowUpgrade}
                            setAllLikedBy={setAllLikedBy}
                            setShowReviews={setShowReviews}
                    /> 
            }
        </div>
    )
};