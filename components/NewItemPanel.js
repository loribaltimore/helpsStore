import React from 'react';
import NewConfig from './NewConfig';

function NewItemPanel({ item, currentUserId, coin, currentMembership }) {

    return (
        <div className="flex w-1/2 p-5 border border-black rounded bg-white">
            <div className='block w-1/2'>
            <img
                src={item.img[0].path}
                className="bg-center object-cover object-center text-center rounded"
           / >  
            </div>
            <div>
                <div className="flex  px-5 w-full">
                    <div className="flex mx-auto space-x-5">
                    <h1 className="text-xl font-extralight text-center text-black">{item.name}</h1>
                    <h1 className="text-xl font-extralight text-center text-green-500">${item.price}</h1>
                    </div>
                </div>
                <NewConfig currentUserId={currentUserId} tier={currentMembership} item={item} coin={coin} />
</div>
        </div>
    );
};

export default NewItemPanel;

