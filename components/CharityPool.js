import { updatePool } from 'lib/updateCart';
import updateSession from 'lib/updateSession';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function CharityPool({ setToPool, cart, setCart, setOpen }) {
    let [isPoolSet, setIsPoolSet] = useState(false);

    const handleClick = async () => {
        if (cart.coin.qty > 0) {
            await updatePool(cart, 1)
                .then(data => { setCart(data) }).catch(err => console.log(err));
            if (!isPoolSet) {
                setIsPoolSet(true);
                let poolCode = uuidv4();
                setToPool(poolCode);
                await updateSession('toPoolID', poolCode)
                    .then(data => { return data }).catch(err => console.log(err));
            }
            if (cart.pool === 0) {
                await updateSession('toPoolID', undefined)
                    .then(data => { return data }).catch(err => console.log(err));
                setToPool(false);
            }
        } else {
            setOpen(true);
        }
    };

    return (
        <div onClick={handleClick} style={{
            color: 'blue',
            fontSize: '3rem',
            cursor: 'pointer',
            display: 'inline-block',
            padding: '0.5rem',
            borderRadius: '50%',
            background: 'url(/path_to_pool_icon.png) center/cover no-repeat'
        }}>
            🌀
        </div>
    );
}

export default CharityPool;
