"use client"
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import calculateDistance from '@/util/calculateDistance';
import Matched from 'components/Matched';

export default function AllProfiles({ allMingles, currentUser }) {
    const [counter, setCounter] = useState(0);
    const [connection, setConnection] = useState(false);
    allMingles = JSON.parse(allMingles);
    const currentUserFormatted = JSON.parse(currentUser);
    console.log(allMingles);
    const currentMingle = allMingles[counter] || undefined;
    const distance = calculateDistance(currentMingle.location.geo.coordinates, currentUserFormatted.location.geo.coordinates) || 5;

    return (
        <div>
            {
                connection ?
                    <Matched connection={connection} setConnection={setConnection} />
                        :
                    <ProfileCard user={currentMingle} setCounter={setCounter}
                        currentUser={currentUser} distance={distance} setConnection={setConnection} />

            }
        </div>
    )
};