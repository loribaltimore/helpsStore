import { useState } from 'react';
import ItemToFulfill from './ItemToFulfill';
import Received from './Received';
import Shipped from './Shipped';

function PurchaseSubPanel({ donation }) {
    const { items } = donation.transaction;
    const [itemList, setItemList] = useState(items);

    return (
        <div className="w-full h-full p-10 border border-black text-black rounded overflow-y-auto font-extralight">
            <h1>Products</h1>
            {donation.fulfillment.order.fulfilled === false ? (
                itemList.map(function (element, index) {
                    if (!element.receiptNo) {
                        return <ItemToFulfill item={element} donationId={donation._id} key={index} setItemList={setItemList} />;
                    } else {
                        return (
                            <div>
                                <h3 className="mb-2">{element.name}</h3>
                                <Received item={element} setItemList={setItemList} donationId={donation._id} key={index} />
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
