import { updateCoin, updatePool } from '../../Cart/functions/updateCart';

function AddDonation({ cart, org, setCart, pool }) {

    const handleClick = async () => {
        if (!pool) {
            await updateCoin(cart, org, -1)
                .then(data => { console.log(data); setCart(data) })
                .catch(err => console.group(err));
        } else {
            await updatePool(cart, 1)
                .then(data => { setCart(data) })
                .catch(err => console.log(err));
        }
    };

    return (
        <div style={{
            fontSize: '2.5rem',
            color: 'blue',
            cursor: 'pointer',
            position: 'relative',
            margin: '0%'
        }}
            onClick={handleClick}
        >
            +
        </div>
    );
}

export default AddDonation;
