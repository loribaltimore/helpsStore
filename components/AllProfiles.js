"use client"
import { useState } from 'react';
import ProfileCard from './ProfileCard';

export default function AllProfiles({ allMingles, currentUserId }) {
    const [counter, setCounter] = useState(0);
    allMingles = JSON.parse(allMingles);
    const currentMingle = allMingles[counter];

    return (
        <div>
            <ProfileCard user={currentMingle} setCounter={setCounter} currentUserId={currentUserId} />
        </div>
    )
};