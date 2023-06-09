"use client"
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import { useSession } from 'next-auth/react';
import calculateDistance from '@/util/calculateDistance';

export default function AllProfiles({ allMingles, currentUser }) {
    const { data: session } = useSession();
    const [counter, setCounter] = useState(0);
    allMingles = JSON.parse(allMingles);
    const currentUserFormatted = JSON.parse(currentUser);
    const currentMingle = allMingles[counter];
    const distance = calculateDistance(currentMingle.location.geo.coordinates, currentUserFormatted.location.geo.coordinates);

    return (
        <div>
            <ProfileCard user={currentMingle} setCounter={setCounter} currentUser={currentUser} distance={distance}  />
        </div>
    )
};