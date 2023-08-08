"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BankThumbnail({ connection, setShowUpgrade, membershipType, setBankConnection}) {
    const [allPhotos, setAllPhotos] = useState();

    useEffect(() => {
            const asyncWrapper = async () => {
                const searchParams = new URLSearchParams();
                connection.photos.forEach(photo => {
                    searchParams.append('photos[]', photo);
                })
                const url = `http://localhost:3000/api/user/photos?${searchParams.toString()}`;
                await fetch(url, {
                    method: 'GET',
                }).then(async data => {
                    const response = await data.json();
                    setAllPhotos(response.formattedPhotos[0]);
                }).catch(err => console.log(err));
            }
            asyncWrapper() 
    }, []);

    return (
        <div
            className={`min-w-full min-h-[12rem] rounded-lg flex ${membershipType === 'basic' ? 'blur-sm' : ''} cursor-pointer z-30 hover:scale-105 transition-all duration-300 ease-in-out`}
            style={{ backgroundImage: ` url(${allPhotos ? allPhotos : null})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
            onClick={() => {
                setShowUpgrade(true);
                if (membershipType === 'pro') {
                    setBankConnection(connection);
                }
            }}
        >
        </div>
    )
};