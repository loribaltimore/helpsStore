import React from 'react';
import NewConfig from './NewConfig';

function NewItemPanel({ item, currentUserId, coin, currentMembership, key }) {
    const direction = {
        true: 'left-20',
        false: 'right-20'
    }
    return (
        <div className={`flex w-1/2 mx-auto border border-gray-300 shadow-2xl rounded bg-white z-20`}>
            <div className='block w-1/2'>
            <img
                src={item.img[0].path}
                className="bg-center object-cover object-center text-center rounded border  shadow-2xl rounded bg-white"
           />  
            </div>
            <div>
                <div className="flex px-5 w-full">
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

