"use client"
import NewItemPanel from 'components/NewItemPanel';

function ItemPage({ allProducts, currentUserId, currentMembership }) {
    
    return (
        <div className='w-full relative gap-4 space-y-3'>
            {
                JSON.parse(allProducts).map(function (element, index) {
                    return <NewItemPanel item={element} currentUserId={currentUserId} key={index} currentMembership={currentMembership} />
                })
            }
    </div>
    )
};

export default ItemPage;