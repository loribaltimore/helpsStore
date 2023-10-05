import ConfigColor from './ConfigColor';
import NewAddCart from './NewAddCart';
import { useState } from 'react';
import { v4 } from 'uuid';

function NewConfig({ currentUserId, tier, item }) {
    let [front, setFront] = useState(undefined);
    let [back, setBack] = useState(undefined);
    let [size, setSize] = useState(item.sizeable ? 'M' : 'OSFA');
    let [alert, setAlert] = useState(false);

    let handleClick = (event) => {
        setSize(event.target.innerText)
    }

    let possibleColors = ['yellow','teal','blue', 'orange', 'magenta', 'tan', 'white', 'black']


    let opacityClass = item.sizeable ? 'opacity-100' : 'opacity-50';
    let tierIndex = Object.keys(possibleColors).indexOf(JSON.parse(tier).tier);

    return (
        <div className="block pt-10 px-5">
            <div className='flex space-x-3'>
                {possibleColors.map((element, index) => {
                    return <div
                        key={v4()}
                        className={`rounded w-[2rem] h-[2rem] border rounded border border-gray-100 shadow-xl rounded bg-white bg-opacity-30 cursor-pointer hover:scale-105`} style={{ backgroundColor: element }}
                        onClick={() => front ? setBack(element) : setFront(element)}
                    ></div>
            })}
            </div>
            
            <div className="w-full mt-4 flex">
                <div className="w-1/12"></div>
                <div className="w-10/12 flex gap-4">
                    {['S', 'M', 'L', 'XL'].map(sizeOption => (
                            <h1 key={v4()}  className="rounded w-1/4 p-1 border rounded border border-gray-100 shadow-xl rounded bg-white bg-opacity-30 text-center text-xl font-extralight text-black cursor-pointer hover:scale-110" onClick={handleClick}>{sizeOption}</h1>
                    ))}
                </div>
            </div>
            <div className="w-full flex gap-4">
                <div className="block w-1/2 text-center ">
                    <h2 className='font-extralight text-md p-3 text-black '>Colors</h2>
                    <div className=" flex gap-4 h-1/2  mx-auto ">
                    <div className="w-1/2 border rounded border border-gray-100 shadow-xl rounded bg-white bg-opacity-30" style={{backgroundColor: front}}></div>
                    <div className="w-1/2 border rounded border border-gray-100 shadow-xl rounded bg-white bg-opacity-30" style={{backgroundColor: back}}></div>
                </div>
                </div>
                
                <div className="w-1/2 text-center">
                    <h2 className='font-extralight text-md p-3 text-black'>Size</h2>
                    <h1 className=" w-1/2 h-1/2 border rounded border border-gray-100 shadow-xl rounded bg-white bg-opacity-30 mx-auto text-xl  text-black font-extralight">{item.sizeable ? size : 'OSFA'}</h1>
                </div>
            </div>
            <div className='block w-1/2 mx-auto pt-10'>
            <NewAddCart front={front} back={back}
                setFront={setFront} setBack={setBack}
                size={size} setSize={setSize}
                alert={alert} setAlert={setAlert}
                currentUserId={currentUserId}
                item={item} />
            </div>
             
            <div className="w-full mt-4">
                {alert && <h4 className="text-red-500 text-center mt-0 mb-4">Please select color and size</h4>}
            </div>
            
        </div>
    )
}

export default NewConfig;
