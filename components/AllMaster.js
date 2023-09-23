"use client"
import ProductForm from 'components/ProductForm';
import AllProducts from 'components/AllProducts';
import Queue from 'components/Queue';
import { useState } from 'react';

function masterPage({ populatedQueue, officialHistory, allProducts }) {
    let [isQueue, setIsQueue] = useState(false);
    let [products, setProducts] = useState(allProducts);
    let [renderForm, setRenderForm] = useState(false);
    
    return (
        <div>
            <div className="flex justify-end items-center p-4">
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setIsQueue(!isQueue)}>
                    {
                        isQueue === true ? 'Products' : 'Orders'
                    }
                </button>
            </div>
            
            {
                isQueue === false ?
                    <div>
                        {   
                            renderForm === true ?
                                <ProductForm setRenderForm={setRenderForm} />: ''
                        }
                        
                        <AllProducts products={products} setProducts={setProducts}
                            setRenderForm={setRenderForm} renderForm={renderForm} />
                    </div>
                    : 
                    <Queue populatedQueue={populatedQueue} officialHistory={officialHistory} />
                }
        </div>
    )
};

export default masterPage;
