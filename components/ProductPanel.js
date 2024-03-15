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
        <div className={`w-full shadow-xl rounded bg-white z-20`}>
            <div className="grid grid-cols-4 gap-4 h-full w-full">
                    <img  src={`/api/products/photos/${product.img[0]._id}`} className=" h-full w-full object-cover text-center rounded border shadow-2xl rounded bg-white"/>
                <div className="col-span-3">
                    {
                        isUpdating === false ?
                            <div className=''>
                                <h1 className="text-xl lg:text-4xl font-extralight text-center  pb-3">{product.name}</h1>
                                <div className="grid grid-cols-2 gap-4 w-full p-2">
                                    <div className="col-span-1">
                                        <h3 className="text-md lg:text-xl font-extralight p-1">Cost: {product.cost}</h3>
                                        <h3 className="text-md lg:text-xl font-extralight p-1">Price: {product.price}</h3>
                                        <h3 className='text-md lg:text-xl font-extralight p-1'>Sold: {product.sold}</h3>
                                    </div>
                                    <div className="col-span-1">
                                        <h3 className="text-md lg:text-xl font-extralight p-1">Donated: {product.totalRaised}</h3>
                                        <h3 className="text-md lg:text-xl font-extralight p-1">Popularity: {product.pop}</h3>

                                    </div>
                                    </div>
                                <h3 className='text-md lg:text-xl font-extralight p-2 text-center'>Lead Time: {product.lead} Days</h3>
                                    <div className="mx-auto w-3/4  space-x-3 py-3">
                                        <div className={'flex '}>
                                            {
                                                renderDelete && <DeleteBtn product={product} setRenderUpdate={setRenderUpdate} />
                                            }
                                            {
                                                renderUpdate && <UpdateBtn product={product} setRenderDelete={setRenderDelete} setIsUpdating={setIsUpdating} isUpdating={isUpdating} />
                                            }
                                        </div>

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
