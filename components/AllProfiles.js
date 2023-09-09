"use client"
import { useState, useContext, useEffect } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import ProfileCard from './ProfileCard';
import calculateDistance from '@/util/calculateDistance';
import Matched from 'components/Matched';
import Reviews from 'components/Reviews';
import QuizResults from 'components/QuizResults';

export default function AllProfiles({ allMingles, setAllLikedBy, currentUser, isBank, isRev }) {
    const [counter, setCounter] = useState(0);
    const [compatibility, setCompatibility] = useState(undefined);

    useEffect(() => {
        // const asyncWrapper = async () => {
        //     await fetch('/api/user/mingles', {
        //         method: 'GET',
        //         headers: {
        //         'Content-Type': 'application/json'
        //         }
        //     }).then(async data => {
        //         const { allMingles } = await data.json();
        //         console.log(allMingles)
        //         // setFetchedMingles(allMingles);
        //     }).catch(err => console.log(err));
        // };
        // if (counter === 1) {
        //     console.log('SPARKY');
            // asyncWrapper();
        // } else {
        //     console.log('NOT SPARKY');
        // console.log(allMingles.length, counter - 1);
        // }
    }, []);

    const { showReviews, bankConnection } = useContext(ReviewContext);
    const [connection, setConnection] = useState(false);
    allMingles =  JSON.parse(allMingles);
    const currentUserFormatted = typeof currentUser === 'string' ? JSON.parse(currentUser) : currentUser;
    const currentMingle = bankConnection || allMingles[counter] || undefined;
    let distance;
    if (currentMingle) {
       distance =  calculateDistance(currentMingle.location.geo.coordinates, currentUserFormatted.location.geo.coordinates);
    };

    return (
        <div className=''>
            {
                connection ?
                    <QuizResults
                        setConnection={setConnection}
                        connection={connection}
                        compatibility={compatibility}
                            /> 
                    :
                    !showReviews ?
                            <ProfileCard
                            user={currentMingle}
                            setCounter={setCounter}
                            currentUser={typeof currentUser === 'string' ? currentUser : JSON.stringify(currentUser)}
                            distance={distance}
                            setConnection={setConnection}
                            isBank={isBank}
                            isRev={isRev}
                            setAllLikedBy={setAllLikedBy}
                            setCompatibility={setCompatibility}
                            /> 
                        : <Reviews connection={currentMingle} />
            }
        </div>
    )
};

//make location save at registration