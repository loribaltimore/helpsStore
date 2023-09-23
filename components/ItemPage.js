"use client"
import NewItemPanel from 'components/NewItemPanel';

function ItemPage({ allProducts, currentUserId, currentMembership }) {
    
    return (
        <div className='w-full flex flex-wrap gap-4'>
            {
                JSON.parse(allProducts).map(function (element, index) {
                    return <NewItemPanel item={element} currentUserId={currentUserId} key={index} currentMembership={currentMembership} />
                })
            }
    </div>
    )
};

export default ItemPage;