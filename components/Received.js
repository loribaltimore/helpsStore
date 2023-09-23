import axios from 'axios';

function Received({ item, donationId, setItemList }) {
    let { id } = item;

    let handleClick = async () => {
        let response = await axios({
            method: 'post',
            url: 'http://localhost:3000/queue',
            data: {
                donationId,
                itemId: id,
                type: 'received',
            },
        })
            .then((data) => {
                console.log(data);
                setItemList(data.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'block' }}>
                <h3 style={{ margin: '0%' }}>Receipt Number: {item.receiptNo}</h3>
                <h4 style={{ margin: '0%' }}>Ordered From: {item.orderedFrom}</h4>
                {!item.received ? (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
