"use client"
import Upgrade from 'components/Upgrade';
import BankThumbnail from 'components/BankThumbnail';
import AllProfiles from 'components/AllProfiles';
import { useState } from 'react';

export default function AllThumbnails({ allLikedBy, setAllLikedBy, membershipType, currentUser }) {
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [bankConnection, setBankConnection] = useState();

    const formattedLikedBy = allLikedBy.map((element, index) => {
        return element.user;
    });
    return (
        <div className="grid grid-cols-5 grid-flow-cols gap-6">
                {
                showUpgrade  ?
            <div className='absolute w-full h-full z-40 grid grid-cols-3 gap-4'>
                        <div className=''></div>
                        {
                            membershipType !== 'pro' ?
                                <Upgrade /> :
                                <div className='fixed z-40'>
                                    <AllProfiles allMingles={JSON.stringify(formattedLikedBy)}
                                        setAllLikedBy={setAllLikedBy}
                                        currentUser={JSON.stringify(currentUser)}
                                        isBank={true} setShowUpgrade={setShowUpgrade}
                                        isBankConnection={bankConnection}
                                    />
                                </div>

                        }
                <div className=''></div>
            </div> : null
            }
            {
                allLikedBy.length ?
                allLikedBy.map((connection, index) => { 
                    return <BankThumbnail connection={connection.user} index={index} key={index} setShowUpgrade={setShowUpgrade} setBankConnection={setBankConnection} membershipType={membershipType} />
                })
                    : null
            }
        </div>
    )
};


//have to be able to delete users from bank on pass 
// => has to do with users who like you getting deleted on pass
