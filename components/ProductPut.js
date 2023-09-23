import { useState, useContext } from 'react';
import { MainContext } from 'components/MainContext';

function ProductPut(props) {
    let { setFlash } = useContext(MainContext);
    let { product, setIsUpdating, setRenderDelete } = props;
    let [name, setName] = useState('');
    let [price, setPrice] = useState('');
    let [cost, setCost] = useState('');
    let [lead, setLead] = useState('');
    let [img, setImg] = useState('');
    let [timeIncrement, setTimeIncrement] = useState('');

    let handleChange = (event) => {
        setTimeIncrement(event.target.value);
    };

    let textfieldChange = (event) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;
            case 'price':
                setPrice(event.target.value);
                break;
            case 'cost':
                setCost(event.target.value);
                break;
            case 'lead':
                setLead(event.target.value);
                break;
        }
    };

    let handleClick = async () => {
        let form = new FormData();
        form.append('img', img[0]);
        form.append('name', name);
        form.append('price', price);
        form.append('cost', cost);
        form.append('id', product._id);
        form.append('lead', lead * timeIncrement);
        await fetch('/products', {
            body: form,
             headers: {
                        'Content-Type': 'mulitpart/form-data'
                    }
                }
            ).then(data => {
                setName('');
                setCode('');
        setPrice('');
        setCost('');
        setLead('');
        setTimeIncrement('');
        setImg('');
        setFlash({ msg: 'Successfully added product!', type: 'success', render: true })
            setAllProducts(data.data);
                return data
            }).catch(err => console.log(err));
    };

    return (
        <div className="bg-white p-4 font-extralight">
            <div className='flex space-x-2'>
            <input type="text" id="name" className="block border p-2 mb-4 rounded" placeholder="Name" name="name" value={name} onChange={(event) => textfieldChange(event)} />
            <input type="text" id="price" className="block border p-2 mb-4 rounded" placeholder="Price" name="price" value={price} onChange={(event) => textfieldChange(event)} />
            </div>
            <div>

            </div>
                <div className=" flex space-x-2">
                    <input type="text" id="cost" className="black border  rounded" placeholder="Cost" name="cost" value={cost} onChange={(event) => textfieldChange(event)} />
                <div className=" flex space-x-2">
                    <input type="text" id="lead" className="border rounded" placeholder="Lead Time" name="lead" value={lead} onChange={(event) => textfieldChange(event)} />
                    <select id="timeIncrement" className="border w-full rounded" value={timeIncrement} onChange={(event) => handleChange(event)}>
                        <option value={1}>Days</option>
                        <option value={7}>Weeks</option>
                        <option value={30}>Months</option>
                    </select>
                    </div>
            </div>
            <div className="p-5">
                <label htmlFor="img" className="block">Add Image</label>
                <input type="file" id="img" name="img" multiple className="" onChange={(event) => {  setImg(event.target.files) }} />
            </div>
            <div className='p-5'>
            <button className="bg-blue-500 text-white p-2 mr-2 rounded" type="button" onClick={() => { handleClick(); setIsUpdating(false); setRenderDelete(true) }}>Submit</button>
            <button className="bg-gray-500 text-white p-2 rounded" type="button" onClick={() => { setIsUpdating(false); setRenderDelete(true) }}>Back</button>
            </div>
        </div>
    )
};

export default ProductPut;
