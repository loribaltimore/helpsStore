"use client"
import ProductForm from 'components/ProductForm';
import AllProducts from 'components/AllProducts';
import Queue from 'components/Queue';
import { useState } from 'react';

function MasterPage({ populatedQueue, officialHistory, allProducts }) {
    let [isQueue, setIsQueue] = useState(false);
    let [products, setProducts] = useState(allProducts);
    let [renderForm, setRenderForm] = useState(false);
    
    return (
        <div className='relative z-20'>
            {
                isQueue === false ?
                    <div>
                        {   
                            renderForm === true ?
                                <ProductForm setRenderForm={setRenderForm} />: ''
                        }
                        
                        <AllProducts products={products} setProducts={setProducts}
                            setRenderForm={setRenderForm} renderForm={renderForm} setIsQueue={setIsQueue} isQueue={isQueue} />
                    </div>
                    : 
                    <Queue populatedQueue={populatedQueue} officialHistory={officialHistory} setIsQueue={setIsQueue} isQueue={isQueue}/>
                }
        </div>
    )
};

export default MasterPage;
