import ProductPanel from './ProductPanel';

function AllProducts({ products, setRenderForm, renderForm, setIsQueue, isQueue }) {
    products = JSON.parse(products);
    return (
        <div className="p-8">
            <button className="text-black rounded border border-black px-3 py-1 focus:outline-none"
                onClick={() => setRenderForm(!renderForm)}>
                Add
            </button>
            <button 
                    className="text-black rounded border border-black px-3 py-1 focus:outline-none"
                    onClick={() => setIsQueue(!isQueue)}>
                    {
                        isQueue === true ? 'Products' : 'Orders'
                    }
                </button>
            {products.map((element, index) => (
                <div key={index}>
                    <ProductPanel product={element} />
                </div>
            ))}
        </div>
    );
}

export default AllProducts;
