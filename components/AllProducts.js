import ProductPanel from './ProductPanel';

function AllProducts({ products, setRenderForm, renderForm }) {
    products = JSON.parse(products);
    return (
        <div className="p-8">
            <button className="bg-blue-500 text-black rounded-full h-16 w-16 focus:outline-none"
                onClick={() => setRenderForm(!renderForm)}>
                +
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
