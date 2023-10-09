import axios from 'axios';
import { useContext, useState } from 'react';

function DeleteBtn(props) {
    let { product, setRenderUpdate } = props;
    let [isSure, setIsSure] = useState(false);

    let handleClick = async (id) => {
        let response = await fetch('/api/products',{
            method: 'delete',
            body: JSON.stringify({ id: product._id }),
        }).then(async data => { data = await data.json(); window.location.reload() }).catch(err => console.log(err));
    };

    return (
        <div className='font-extralight'>
            {
                isSure === false ?
                    <button 
                        className="text-black bg-gray-200 px-4 py-2 shadow-xl rounded ml-12 hover:scale-105 active:scale-100"
                        onClick={() => { setIsSure(!isSure); setRenderUpdate(false) }}>
                        Delete
                    </button>
                :
                    <div className="text-center">
                        <h2 className='text-lg mb-2'>Are you Sure</h2>
                        <button 
                            className="text-black bg-gray-200 px-4 py-2 shadow-xl rounded ml-12 hover:scale-105 active:scale-100"
                            onClick={() => { handleClick(); setRenderUpdate(true); setIsSure(!isSure); }}>
                        Yes
                        </button>
                        <button 
                            className="text-black bg-gray-200 px-4 py-2 shadow-xl rounded ml-12 hover:scale-105 active:scale-100"
                            onClick={() => { setIsSure(!isSure); setRenderUpdate(true) }}>
                        Back
                        </button>
                    </div>
            }
        </div>
    )
};

export default DeleteBtn;
