"use client"
import { useState, useContext, useEffect } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import ProfileCard from './ProfileCard';
import calculateDistance from '@/util/calculateDistance';
import Matched from 'components/Matched';
import Reviews from 'components/Reviews';

export default function AllProfiles({ allMingles, setAllLikedBy, currentUser, isBank,
    setBankConnection, isBankConnection, isRev }) {
        const [counter, setCounter] = useState(0);

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

    const {  showReviews} = useContext(ReviewContext);
    const [connection, setConnection] = useState(false);
    allMingles =  JSON.parse(allMingles);
    const currentUserFormatted = typeof currentUser === 'string' ? JSON.parse(currentUser) : currentUser;
    const currentMingle = isBankConnection || allMingles[counter] || undefined;
    let distance;
    if (currentMingle) {
       distance =  calculateDistance(currentMingle.location.geo.coordinates, currentUserFormatted.location.geo.coordinates);
    };
    return (
        <div className='w-100'>
            {
                connection ?
                    <Matched connection={connection} setConnection={setConnection} />
                    :
                    !showReviews ?
                        <ProfileCard user={currentMingle} setCounter={setCounter}
                            currentUser={typeof currentUser === 'string' ? currentUser : JSON.stringify(currentUser)}
                            distance={distance}
                            setConnection={setConnection}
                            setBankConnection={setBankConnection}
                            isBank={isBank}
                            isRev={isRev}
                            setAllLikedBy={setAllLikedBy}

                        /> : <Reviews connection={currentMingle} />
            }
        </div>
    )
};