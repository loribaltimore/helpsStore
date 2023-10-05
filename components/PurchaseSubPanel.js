import { useState } from 'react';
import ItemToFulfill from './ItemToFulfill';
import Received from './Received';
import Shipped from './Shipped';

function PurchaseSubPanel({ donation }) {
    const { items } = donation.transaction;
    console.log(donation)
    const [itemList, setItemList] = useState(items);
    return (
        <div className="w-full h-full p-10 text-black rounded overflow-y-auto font-extralight">
            <h1>Products</h1>
            {donation.fulfillment.order.fulfilled === false ? (
                itemList.map(function (element, index) {
                    if (!element.receiptNo) {
                        return <ItemToFulfill key={index*12} item={element} donationId={donation._id} setItemList={setItemList} />;
                    } else {
                        return (
                            <div key={index} >
                                <h3 className="mb-2">{element.name} x{element.config.qty}</h3>
                                <Received item={element} setItemList={setItemList} donationId={donation._id} />
                            </div>
                        );
                    }
                })
            ) : (
                <div>
                    <Shipped donation={donation} address={donation.transaction.shipTo} setItemList={setItemList} />
                </div>
            )}
        </div>
    );
}

export default PurchaseSubPanel;
