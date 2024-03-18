
import React from 'react';
import NewConfig from './NewConfig';

 function NewItemPanel({ item, currentUserId, coin, currentMembership, }) {
    const direction = {
        true: 'left-20',
        false: 'right-20'
    }
    return (
        <div className={`flex w-full lg:w-3/4 mx-auto border border-gray-300 shadow-2xl rounded bg-white z-20 h-[21rem]`}>
            <div className='block w-1/2'>
            <img
                src={`/api/products/photos/${item.img[0]._id}`}
                className="bg-center h-full w-full  object-cover text-center rounded border shadow-2xl rounded bg-white"
           
                />  
            </div>
            <div className="w-1/2">
                <div className="flex px-5 w-full">
                    <div className="flex mx-auto space-x-5">
                    <h1 className="text-sm lg:text-xl font-extralight text-center text-black">{item.name}</h1>
                    <h1 className="text-sm lg:text-xl font-extralight text-center text-green-500">${item.price}</h1>
                    </div>
                </div>
                <NewConfig currentUserId={currentUserId} tier={currentMembership} item={item} coin={coin} />
</div>
        </div>
    );
};

export default NewItemPanel;

