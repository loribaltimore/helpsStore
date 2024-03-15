"use client"
import NewItemPanel from 'components/NewItemPanel';

function ItemPage({ allProducts, currentUserId, currentMembership }) {
    
    return (
        <div className='w-full relative space-y-2 md:gap-4 md:grid md:grid-rows-2 md:grid-flow-col'>
            {
                JSON.parse(allProducts).map(function (element, index) {
                    return <NewItemPanel item={element} currentUserId={currentUserId} key={index} currentMembership={currentMembership} />
                })
            }
    </div>
    )
};

export default ItemPage;