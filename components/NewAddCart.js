import React, { useContext } from 'react';
import { addToCart } from 'lib/updateCart';
import { MainContext } from 'components/MainContext';

function NewAddCart({ setAlert, setSize, size, back, front, setBack, setFront, currentUserId, item }) {

    const { cart, setCart } = useContext(MainContext);
    const { sizeable } = item;

    const handleClick = async () => {
        let canAdd = false;
        if (sizeable === true) {
            front !== undefined && back !== undefined && size !== undefined ? (canAdd = true) : '';
        } else {
            front !== undefined && back !== undefined ? (canAdd = true) : '';
        }

        if (canAdd === true) {
            const config = { size: size, colors: [front, back], qty: 1 };
            item.config = config;
            await addToCart(JSON.parse(currentUserId), cart, item)
                .then((data) => {
                    setCart(data);
                })
                .catch((err) => console.log(err));
            setSize(undefined);
        } else {
            setAlert(true);
        }
    };

    return (
    
                <button className='w-full mx-auto p-1 border border-black rounded font-extralight text-black' onClick={() => handleClick()}>Add</button>
    );
}

export default NewAddCart;
