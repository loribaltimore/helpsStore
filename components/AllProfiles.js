"use client"
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import calculateDistance from '@/util/calculateDistance';
import Matched from 'components/Matched';
import QuizResults from 'components/QuizResults';

export default function AllProfiles({ allMingles, currentUser }) {
    const [counter, setCounter] = useState(0);
    const [matched, setMatched] = useState(false);
    allMingles = JSON.parse(allMingles);
    const currentUserFormatted = JSON.parse(currentUser);
    console.log(allMingles);
    const currentMingle = allMingles[counter] || undefined;
    const distance = calculateDistance(currentMingle.location.geo.coordinates, currentUserFormatted.location.geo.coordinates) || 5;

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