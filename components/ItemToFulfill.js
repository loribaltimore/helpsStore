import { useState } from 'react';
import PurchaseFulfill from './PurchaseFulfill';

function ItemToFulfill({item, donationId, setItemList}) {
    let [toRender, setToRender] = useState(false);
    
    let handleClick = () => {
        setToRender(true);
    };

    return (
        <div className="bg-white p-4">
            {
                toRender === false ?
                    <div className="grid grid-cols-12 gap-4 cursor-pointer">
                        <div className="col-span-1">
                            <img src={item.img} className="w-full h-12" alt="Item" />
                        </div>
                        <div className="col-span-4 text-center">
                            <h2 className="mt-0">{item.name}</h2>
                        </div>
                        <div className="col-span-1 grid grid-cols-3 gap-2 h-7">
                            <div className="col-span-5 bg-red-500 rounded" style={{backgroundColor: item.config.colors[0]}}></div>
                            <div className="col-span-2"></div>
                            <div className="col-span-5 bg-green-500 rounded" style={{backgroundColor: item.config.colors[1]}}></div>
                        </div>
                        <div className="col-span-1 text-center">
                            {
                                item.config.size.length > 1 ?
                                <h3 className="mt-2">{item.config.size}</h3>
                                :
                                <h2 className="mt-2">{item.config.size}</h2>
                            }
                        </div>
                        <div className="col-span-12 mt-4">
                            <button onClick={() => handleClick()} className="bg-blue-600 text-white rounded p-2">Fulfill</button>
                        </div>
                        <hr className="border-gray-400 col-span-12" />
                    </div>
                    : 
                    <PurchaseFulfill donationId={donationId} item={item} setItemList={setItemList}/>
            }
        </div>   
    )
};

export default ItemToFulfill;
