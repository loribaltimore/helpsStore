import { useState } from 'react';
import PurchaseFulfill from './PurchaseFulfill';


function ItemToFulfill({item, donationId, setItemList}) {
    let [toRender, setToRender] = useState(false);
    
    let handleClick = () => {
        setToRender(true);
    };

    return (
        <div className="bg-white px-5 py-2 border border-black rounded">
            {
                toRender === false ?
                    <div className=" cursor-pointer w-full" >
                  <div className="flex space-x-1">
                    <img src={item.img} className="rounded-full w-10 h-10" />
                    <div className="w-3/4 text-center">
                      <h2 className="text-xl font-extralight">{item.name}</h2>
                            </div>
                       

                        </div>
                        <div className="flex p-3 space-x-3 ">
                            <div className="w-1/4 text-center text-xl">
                      <h3 className="font-extralight">{item.config.size}</h3>
                    </div>
                    <div className="w-1/4 text-center">
                      <h2 className="font-extralight">${item.price}</h2>
                    </div>
                    <div className="w-1/4 text-center">
                      <h2 className="font-extralight">qty:{item.config.qty}</h2>
                                </div>
 
                            <div className="block w-full  ">
                                <div className="w-1/2 flex h-1/2 space-x-2 mx-auto">
                      <div className="w-1/2 rounded border border-black" style={{ backgroundColor: item.config.colors[0] }}></div>
                      <div className="w-1/2  rounded border border-black" style={{ backgroundColor: item.config.colors[1] }}></div>
                            </div>
                                </div>
                             <button className='border border-black text-black p-1 rounded w-1/2' onClick={() => handleClick()}>Fulfill</button>
                        </div>
                    </div>
                    : 
                    <PurchaseFulfill donationId={donationId} item={item} setItemList={setItemList}/>
            }
        </div>   
    )
};

export default ItemToFulfill;
