"use client"
import {useState, useContext} from 'react';
import CharityDescription from 'components/CharityDescription';
import CharityLike from 'components/CharityLike';
import CharityDonate from 'components/CharityDonate';
import CharityUnlike from 'components/CharityUnlike';
import {ExploreContext}from 'components/ExploreContext';

function NewCharityCard({ org, setSlice, slice, type, currentUser, recommendedCause}) {
    const [renderDesc, setRenderDesc] = useState(false);
    const { currentCause } = useContext(ExploreContext);
    const handleClick = (num) => {
        let low = slice[0] + num;
        let high = slice[1] + num;
        setSlice([low, high]);
    };

    const handleHover = () => {
        setRenderDesc(true);
    };

    return (
        <div className={`w-[23%] m-1 h-full border border-black font-extralight text-black bg-white rounded`}>
                        <div className="bg-beige text-sm text-center py-1 ">{currentCause||recommendedCause || 'helps'}</div>
            <img src={org.coverImageUrl} className='w-full h-[10rem] border-t border-b border-black object-center object-cover'/>
            <CharityDescription org={org} />
            <div className="flex items-center justify-between pt-4">
                {
                    type === 'donation' 
                    ? <div className="text-5xl text-green-500">${org.coinTotal * 5}</div>
                    : null
                }
            </div>

            <div className=' w-1/2 block mx-auto'>
                {
                    type === 'purchase' ?
                        <CharityDonate currentUser={currentUser} org={org} />
                        : 
                <div className='flex space-x-5 p-3'>
            <CharityLike currentUser={currentUser} org={org} recommendedCause={recommendedCause} />
                <CharityUnlike org={org} recommendedCause={recommendedCause} />
            </div>
                }
         </div>
        </div>
    )
}

export default NewCharityCard;
