import axios from 'axios';
import { useState } from 'react';

function PurchaseFulfill({ item, donationId, setItemList }) {
    let { id } = item;
    let [receiptNo, setReceiptNo] = useState('');
    let [orderedFrom, setOrderedFrom] = useState('');
    let [purchaseSubmit, setPurchaseSubmit] = useState(false);

    let handleChangeReceipt = (event) => {
        setReceiptNo(event.target.value);
    };

    let handleChangeFrom = (event) => {
        setOrderedFrom(event.target.value);
    };

    let handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setPurchaseSubmit(true);
        }
    };

    let handleSubmit = async () => {
        await fetch('/api/queue', {
            method: 'post',
            body: JSON.stringify({
                receiptNo,
                orderedFrom,
                donationId,
                itemId: id,
                type: 'purchase'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async data => {
            data = await data.json();
            setItemList(data.response);
        }).catch(err => console.log(err));
    };

    return (
        <div className="h-24">
            {purchaseSubmit === false ? (
                <div>
                    <input
                        className="h-10 w-full border p-2"
                        placeholder="Receipt No."
                        value={receiptNo}
                        onChange={(event) => handleChangeReceipt(event)}
                        onKeyDown={(event) => handleKeyPress(event)}
                    />
                    <input
                        className="h-10 w-full border p-2 mt-2"
                        placeholder="Ordered From"
                        value={orderedFrom}
                        onChange={(event) => handleChangeFrom(event)}
                        onKeyDown={(event) => handleKeyPress(event)}
                    />
                </div>
            ) : (
                <div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleSubmit()}
                    >
                        Ordered
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                        onClick={() => setPurchaseSubmit(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export default PurchaseFulfill;
