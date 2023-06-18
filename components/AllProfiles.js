"use client"
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import calculateDistance from '@/util/calculateDistance';
import Matched from 'components/Matched';

export default function AllProfiles({ allMingles, currentUser }) {
    const [counter, setCounter] = useState(0);
    const [matched, setMatched] = useState(false);
    allMingles = JSON.parse(allMingles);
    const currentUserFormatted = JSON.parse(currentUser);
    const currentMingle = allMingles[counter];
    const distance = calculateDistance(currentMingle.location.geo.coordinates, currentUserFormatted.location.geo.coordinates);

    return (
        <div>
            {
                matched ?
                    <Matched matched={matched} setMatched={setMatched} />
                        :
                    <ProfileCard user={currentMingle} setCounter={setCounter}
                        currentUser={currentUser} distance={distance} setMatched={setMatched} />

        }
        </div>
    )
};