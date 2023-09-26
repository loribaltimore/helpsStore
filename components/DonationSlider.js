"use client"
import NewCharityCard from 'components/NewCharityCard';
import { useState } from 'react';
import ChooseCharity from 'components/ChooseCharity';

function DonationSlider({ donations }) {
    let [donationSlice, setDonationSlice] = useState([0, 4]);
    console.log(donations);
    let blankSpaces = [
        <div className='w-[23%]  h-[27rem] border border-dashed rounded'></div>,
        <div className='w-[23%]  h-[27rem] border border-dashed rounded'></div>,
        <div className='w-[23%]  h-[27rem] border border-dashed rounded'></div>,
        <div className='w-[23%]  h-[27rem]  border border-dashed rounded'></div>,
    ];

    return (
        <div className=" w-full h-full border border-black p-5 rounded overflow-x-scroll">
            <div className='flex w-full ml-5 space-x-2'>
            {
                Object.keys(donations).length ?
                    Object.keys(donations).slice(donationSlice[0], donationSlice[1]).map(function (element, index) {
                        return <NewCharityCard org={donations[element]} last={index === donationSlice[1] - 1}
                            slice={setDonationSlice}
                            setSlice={donationSlice}
                            length={Object.keys(donations).length}
                            index={index}
                            type={'donation'}
                            key={index} />
                    }) :
                    blankSpaces.map(function (element, index) {
                        return element;
                    })
            }
            </div>
            </div>
    );
};

export default DonationSlider;
