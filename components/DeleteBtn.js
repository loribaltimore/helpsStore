import axios from 'axios';
import { useContext, useState } from 'react';

function DeleteBtn(props) {
    let { product, setRenderUpdate } = props;
    let [isSure, setIsSure] = useState(false);

    let handleClick = async (id) => {
        let response = await axios({
            method: 'delete',
            url: 'http://localhost:3000/products',
            data: {
                id: product._id
            }
        }).then(data => { setAllProducts(data.data) }).catch(err => console.log(err));
    };

    return (
        <div className='font-extralight'>
            {
                isSure === false ?
                    <button 
                        className="bg-white text-black border border-black ring ring-inset ring-red-500 px-4 py-2 rounded ml-12"
                        onClick={() => { setIsSure(!isSure); setRenderUpdate(false) }}>
                        Delete
                    </button>
                :
                    <div className="text-center">
                        <h2 className='text-lg mb-2'>Are you Sure</h2>
                        <button 
                            className="bg-red-500 px-4 py-2 rounded text-white mr-4"
                            onClick={() => { handleClick(); setRenderUpdate(true); setIsSure(!isSure); }}>
                        Yes
                        </button>
                        <button 
                            className="bg-green-500 px-4 py-2 rounded text-white"
                            onClick={() => { setIsSure(!isSure); setRenderUpdate(true) }}>
                        Back
                        </button>
                    </div>
            }
        </div>
    )
};

export default DeleteBtn;
