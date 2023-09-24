import { SignUpContext } from './SignUpContext';
import { useState, useContext } from 'react';
import StateInput from './StateInput';

function UserAddress(props) {
   let {setShipping, setBilling} = useContext(SignUpContext);
    let { setIsBilling, isBilling, setRenderAddress, setRenderContact } = props;
    let [streetNumber, setStreetNumber] = useState('');
    let [streetName, setStreetName] = useState('');
    let [city, setCity] = useState('');
    let [state, setState] = useState('');
    let [renderBilling, setRenderBilling] = useState(false);
    let [renderShipping, setRenderShipping] = useState(true);

    let msg = {
        'false': 'Next',
        'true': 'Add'
    };
    let header = {
        'true': 'Billing Address',
        'false': 'Where do you receive packages?'
    };
    console.log(state);
    let handleClick = () => {
        if (streetNumber && streetName && city ) {
            event.target.click();
        if (renderBilling === true && renderShipping === true) {
            console.log('1')
            setShipping({ streetNumber, streetName, city, state });
            setStreetNumber('');
            setStreetName('');
            setCity('');
            setState('');
            setIsBilling(true);
            setRenderShipping(false);
        } else if (renderBilling === true && renderShipping === false) {
            console.log('2')
            setBilling({ streetNumber, streetName, city, state });
            setRenderAddress(false);
            setRenderContact(true);
        } else {
            console.log('3')
            setBilling({ streetNumber, streetName, city, state, sameAsShipping: true });
            setShipping({ streetNumber, streetName, city, state });
            setRenderAddress(false);
            setRenderContact(true);
        };
        };
    };

    let handleChange = (event) => {
        setRenderBilling(event.target.value === 'true');
    };

    return (
        <div className="flex justify-center items-center min-h-screen text-black font-extralight">
            <div className="bg-white p-10 rounded  w-1/2  border border-black">
                <h3 className="text-center text-2xl mb-6">{header[isBilling]}</h3>   
                <div>
                    <label className="block mb-2 text-gray-700">Street Number</label>
                    <input className="w-full p-2 rounded mb-2 border border-black text-black" value={streetNumber}
                        onChange={(event) => setStreetNumber(event.target.value)} />
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">Street Name</label>
                    <input className="w-full p-2 rounded mb-2 border border-black text-black" value={streetName}
                        onChange={(event) => setStreetName(event.target.value)}/>
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">City</label>
                    <input className="w-full p-2 rounded mb-2 border border-black text-black" value={city}
                        onChange={(event) => setCity(event.target.value)}/>
                </div>
                <div>
                    <StateInput setState={setState} state={state}/>
                </div>
                <div className="my-4">
                    <label className="block text-gray-700 mb-2">Billing Address</label>
                    <div className="flex items-center space-x-4">
                        <input type="radio" name="billing" value="false" 
                            onChange={(event) => handleChange(event)} className="cursor-pointer border border-black text-black"/>
                        <label className="cursor-pointer">Same As Shipping</label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="radio" name="billing" value="true" 
                            onChange={(event) => handleChange(event)} className="cursor-pointer border border-black text-black"/>
                        <label className="cursor-pointer">Add Billing Address</label>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button className="border border-black text-black px-4 py-2 rounded hover:scale-110 active:scale-90"
                        onClick={() => handleClick()}>{msg[renderBilling]}</button>
                </div>
            </div>
        </div>
    )
};

export default UserAddress;
