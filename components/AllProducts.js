import ProductPanel from './ProductPanel';

function AllProducts({ products, setRenderForm, renderForm, setIsQueue, isQueue }) {
    products = JSON.parse(products);
    return (
        <div className="p-8 font-extralight space-y-3">
            <button className="text-black bg-gray-200 px-4 py-2 shadow-xl rounded ml-12 hover:scale-105 active:scale-100"
                onClick={() => setRenderForm(!renderForm)}>
                Add
            </button>
            <button 
                    className="text-black bg-gray-200 px-4 py-2 shadow-xl rounded ml-12 hover:scale-105 active:scale-100"
                    onClick={() => setIsQueue(!isQueue)}>
                    {
                        isQueue === true ? 'Products' : 'Orders'
                    }
                </button>
            <div className=' md:grid md:grid-rows-2 md:gap-2 md:grid-flow-col space-y-3'>
            {products.map((element, index) => (
                    <ProductPanel product={element} />
            ))}
            </div>
        </div>
    );
}

export default AllProducts;
