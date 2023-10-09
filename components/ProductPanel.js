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
        <div className={`flex w-3/4 mx-auto h-[20rem] mb-4 shadow-xl rounded bg-white z-20`}>
            <div className="grid grid-cols-4 gap-4 h-full w-full">
                    <img  src={`/api/products/photos/${product.img[0]._id}`} className=" h-[20rem] w-full object-cover text-center rounded border shadow-2xl rounded bg-white"/>
                <div className="col-span-3">
                    {
                        isUpdating === false ?
                            <div className=''>
                                <h1 className="text-4xl font-extralight pb-3">{product.name}</h1>
                                <div className="grid grid-cols-3 gap-4 w-3/4">
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
                                    <div className="col-span-1 flex pt-3">
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
