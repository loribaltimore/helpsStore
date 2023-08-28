"use client"
import { useEffect, useState } from 'react';
import AllThumbnails from 'components/AllThumbnails';

export default function Bank({ }) {
    const [allLikedBy, setAllLikedBy] = useState([]);
    const [membershipType, setMembershipType] = useState('');
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const asyncWrapper = async () => {
            await fetch('/api/user/tester', {
                method: 'GET',
            }).then(async data => {
                const response = await data.json(); 
                setAllLikedBy(response.allLikedBy);
                setMembershipType(response.membershipType);
                setCurrentUser(response.currentUser);
            }).catch(err => console.log(err));
        };
        asyncWrapper();
    }, []);
    console.log(allLikedBy);
    return (
        <div className='relative w-100'>
            {
                allLikedBy ?
                    <AllThumbnails allLikedBy={allLikedBy}
                        setAllLikedBy={setAllLikedBy}
                        membershipType={membershipType}
                        currentUser={currentUser}
                    />
                    : null
            }
        </div>
    )
};

  