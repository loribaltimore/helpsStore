import axios from 'axios';
import { useState } from 'react';

function Shipped({ address, donation, setItemList }) {
    let [tracking, setTracking] = useState('');
    let [isShipped, setIsShipped] = useState(false);

    let addressString = Object.values(address).join(' ');

    let handleChange = (event) => {
        setTracking(event.target.value);
    };

    let handleClick = async () => {
        let response = await axios({
            method: 'post',
            url: 'http://localhost:3000/queue',
            data: {
                donationId: donation._id,
                tracking,
                type: 'shipped',
            },
        })
            .then((data) => {
                console.log(data);
                setItemList(data.data.items);
                setIsShipped(data.data.shipped);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {!donation.fulfillment.order.shipped || isShipped ? (
                <div className='w-1/2 mx-auto font-extralight'>
                    <h1 className='text-4xl'>Ship To:</h1>
                   <h3 className='text-xl font-extralight py-2'>{addressString}</h3>
                    <div className='flex space-x-1'>
                        <input
                        name={tracking}
                            value={tracking}
                            placeholder='Tracking Number'
                        className='text-black font-extralight px-4 rounded'
                        onChange={(event) => handleChange(event)}
                    />
                    <button
                        className="bg-white border border-black ring ring-inset ring-blue-500 hover:bg-blue-500 text-black font-extralight py-2 px-4 rounded"
                        onClick={() => handleClick()}
                    >
                        Ship
                    </button>
                        </div>
                    
                </div>
            ) : (
                    <div className='space-y-5 py-5'>
                <div className='text-center font-extralight'>
                        <h3 className="text-4xl">Shipped:</h3>
                        <h4 className='text-xl'>{donation.fulfillment.order.shipped}</h4>
                </div>
                <div className='text-center font-extralight'>
                        <h3 className="text-4xl">Tracking Number:</h3>
                        <h4 className='text-xl'>{donation.fulfillment.order.tracking}</h4>
                        </div>
                        </div>
            )}
        </div>

    );
}

export default Shipped;
