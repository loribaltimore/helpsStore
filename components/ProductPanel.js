import { useState } from 'react';
import DeleteBtn from './DeleteBtn';
import UpdateBtn from './UpdateBtn';
import ProductPut from './ProductPut';

function ProductPanel(props) {
    let { product } = props;
    let [renderDelete, setRenderDelete] = useState(true);
    let [renderUpdate, setRenderUpdate] = useState(true);
    let [isUpdating, setIsUpdating] = useState(false);

    return (
        <div className="border border-black rounded text-black bg-white mb-8 p-3">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <img src={product.img[0].path} className="rounded"/>
                </div>
                <div className="col-span-3">
                    {
                        isUpdating === false ?
                            <div className='p-5'>
                                <h1 className="text-4xl font-extralight">{product.name}</h1>
                                <div className="grid grid-cols-3 gap-4 p-5">
                                    <div className="col-span-1">
                                        <h3 className="text-xl font-extralight p-1">Cost: {product.cost}</h3>
                                        <h3 className="text-xl font-extralight p-1">Price: {product.price}</h3>
                                        <h3 className='text-xl font-extralight p-1'>Total Sold: {product.sold}</h3>
                                    </div>
                                    <div className="col-span-1">
                                        <h3 className="text-xl font-extralight p-1">Total Donated: {product.totalRaised}</h3>
                                        <h3 className="text-xl font-extralight p-1">Popularity: {product.pop}</h3>
                                        <h3 className='text-xl font-extralight p-1'>Lead Time: {product.lead} Days</h3>
                                    </div>
                                    </div>
                                    <div className="col-span-1 flex p-5">
                                        {
                                            renderDelete && <DeleteBtn product={product} setRenderUpdate={setRenderUpdate} />
                                        }
                                        {
                                            renderUpdate && <UpdateBtn product={product} setRenderDelete={setRenderDelete} setIsUpdating={setIsUpdating} isUpdating={isUpdating} />
                                        }
                                    </div>
                                </div>
                            : <ProductPut product={product} setIsUpdating={setIsUpdating} setRenderDelete={setRenderDelete} />
                         }
                    </div>
            </div> 
        </div>
    )
};

export default ProductPanel;
