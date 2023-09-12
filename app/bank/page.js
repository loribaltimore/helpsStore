"use client"
import { useEffect, useState, useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';
import AllThumbnails from 'components/AllThumbnails';

export default function Bank({ }) {
    const [allLikedBy, setAllLikedBy] = useState([]);
    const [membershipType, setMembershipType] = useState('');
    const [currentUser, setCurrentUser] = useState();
    const { setIsLoading } = useContext(ReviewContext);

    useEffect(() => {
        setIsLoading(true);
        const asyncWrapper = async () => {
            await fetch('/api/user/tester', {
                method: 'GET',
            }).then(async data => {
                const response = await data.json(); 
                setAllLikedBy(response.allLikedBy);
                setMembershipType(response.currentUser.membership.membershipType);
                setCurrentUser(response.currentUser);
                setIsLoading(false)
            }).catch(err => console.log(err));
        };
        asyncWrapper();
    }, []);

    return (
        <div className='block relative w-100'>
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

  