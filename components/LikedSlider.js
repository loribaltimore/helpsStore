"use client"
import NewCharityCard from 'components/NewCharityCard';
import { useState } from 'react';
import { v4 } from 'uuid';

function LikedSlider({ liked }) {
    let [donationSlice, setDonationSlice] = useState([0, 4]);

    let blankSpaces = [
        <div key={v4()}  className=' h-[20rem] border border-dashed rounded'></div>,
        <div key={v4()}  className=' h-[20rem] border border-dashed rounded'></div>,
        <div key={v4()}  className=' h-[20rem] border border-dashed rounded'></div>,
        <div key={v4()}  className='c h-[20rem] border border-dashed rounded'></div>,

    ];

    return (
        <div className=" w-full h-full border border-black p-5 rounded overflow-x-scroll">
            <div className='flex w-full ml-5 space-x-2'>
{
                liked.length ?
                    liked.slice(donationSlice[0], donationSlice[1]).map(function (element, index) {
                        return <NewCharityCard org={element} last={index === donationSlice[1] - 1}
                            slice={setDonationSlice}
                            setSlice={donationSlice}
                            length={liked.length}
                            index={index}
                            context={23}
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

export default LikedSlider;