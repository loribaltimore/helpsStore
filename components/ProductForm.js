import { useState, useContext } from 'react';
import { MainContext } from 'components//MainContext';

function ProductForm({ setRenderForm }) {
     let { setFlash } = useContext(MainContext);
    let [name, setName] = useState('');
    let [price, setPrice] = useState('');
    let [cost, setCost] = useState('');
    let [lead, setLead] = useState('');
    let [img, setImg] = useState('');
    let [code, setCode] = useState('');
    let [timeIncrement, setTimeIncrement] = useState('');
    let [updatedProducts, setUpdatedProducts] = useState(undefined);
    let handleChange = (event) => {
        setTimeIncrement(event.target.value);
    };

    let textfieldChange = (event) => {
        switch (event.target.name) {
            case 'name': setName(event.target.value);
                break;
            case 'price': setPrice(event.target.value);
                break;
            case 'cost': setCost(event.target.value);
                break;
            case 'lead': setLead(event.target.value);
                break;
            case 'code': setCode(event.target.value);
        }
    };
  let handleClick = async () => {
        let form = new FormData();
            form.append('img', img[0]);
            form.append('name', name);
            form.append('price', price);
            form.append('code', code);
            form.append('cost', cost);
        form.append('lead', lead * timeIncrement);
      await fetch('/products', {
          method: 'post',
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
        // setFlash({ msg: 'Successfully added product!', type: 'success', render: true })
            // setAllProducts(data.data);
                return data
            }).catch(err => console.log(err));
        setRenderForm(false);
        };
        

    return (
        <div className="bg-white z-10 w-1/2 p-4 items mx-96 absolute rounded font-extralight border border-black text-center">
            <h3>Create Product</h3>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 px-4">
                    <input className="border rounded px-3 py-2 w-full" type="text" placeholder="Name" name="name" value={name} onChange={textfieldChange} />
                </div>
                <div className="col-span-6 px-4">
                    <input className="border rounded px-3 py-2 w-full" type="text" placeholder="Price" name="price" value={price} onChange={textfieldChange} />
                </div>
                <div className="col-span-6 px-4">
                    <input className="border rounded px-3 py-2 w-full" type="text" placeholder="Code" name="code" value={code} onChange={textfieldChange} />
                </div>
                <div className="col-span-6 px-4">
                    <input className="border rounded px-3 py-2 w-full" type="text" placeholder="Cost" name="cost" value={cost} onChange={textfieldChange} />
                </div>
                <div className="col-span-6 px-4">
                    <input className="border rounded px-3 py-2 w-full" type="text" placeholder="Lead Time" name="lead" value={lead} onChange={textfieldChange} />
                </div>
                <div className="col-span-6 px-4">
                    <select className="border rounded px-3 py-2 w-full" value={timeIncrement} onChange={handleChange}>
                        <option value={1}>Days</option>
                        <option value={7}>Weeks</option>
                        <option value={30}>Months</option>
                    </select>
                </div>
                <label className="w-1/4 mb-3 text-black font-extralight cursor-pointer col-span-12 px-4 space-x-4">
                        Add Image
                        <input type="file" className="p-3" name="img" multiple onChange={(event) => setImg(event.target.files)} />
                    </label>
                <div className="col-span-12 px-4 space-x-4 items-center">
                    <button onClick={handleClick} className="bg-blue-600 text-white rounded px-4 py-2">Submit</button>
                </div>
            </div>
        </div>
    )
};

export default ProductForm;
