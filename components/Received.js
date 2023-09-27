import axios from 'axios';

function Received({ item, donationId, setItemList }) {
    let { id } = item;

    let handleClick = async () => {
        await fetch('/api/queue', {
            method: 'post',
            body: JSON.stringify({
                donationId,
                itemId: id,
                type: 'received',
            }),
        }).then(async (data) => {
                data = await data.json();
                console.log(data);
                setItemList(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={{ display: 'flex' }} className='font-extralight border border-black p-3 rounded'>
            <div style={{ display: 'block' }}>
                <h3 style={{ margin: '0%' }}>Receipt Number: {item.receiptNo}</h3>
                <h4 style={{ margin: '0%' }}>Ordered From: {item.orderedFrom}</h4>
                {!item.received ? (
                    <button
                        className="text-black border border-black py-2 px-4 rounded hover:scale-110 active:scale-90"  
                        style={{ margin: '0%', marginLeft: '5%' }}
                        onClick={() => handleClick()}
                    >
                        Received
                    </button>
                ) : (
                    <h3>RECEIVED: {item.received}</h3>
                )}
            </div>
        </div>
    );
}

export default Received;
