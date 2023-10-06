import Cause from 'components/Cause';
import charityCauses from 'util/charityCauses.js';
import { useState, useContext } from 'react';
import { SignUpContext } from 'components/SignUpContext';

function SelectCauses(props) {
    let { setRenderBio, setRenderInterests } = props;
    let [page, setPage] = useState(1);
    let {interests} = useContext(SignUpContext);
    let causesToShow = [12 * (page - 1), 12 * (page - 1) + 12];

    let handleChange = (event, value) => {
        setPage(value);
    };
    let handleClick = () => {
        setRenderBio(true);
        setRenderInterests(false);
    }

    return (
        <div className="font-extralight">
            <div className="container mx-auto p-4">
                <h1 className="py-2 text-4xl">What are you passionate about?</h1>
                <div className="h-96 pl-6">
                    <div className="grid grid-cols-4 gap-4 p-10">
                        {
                            charityCauses.slice(causesToShow[0], causesToShow[1]).map((element, index) => (
                                <div className="col-span-1" key={index}>
                                    <Cause cause={element} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="block relative mx-auto w-1/4  mt-4">
                    {/* A simple pagination approach */}
                    <div className="flex space-x-5 ">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleChange(null, idx + 1)}
                                className={`px-3 py-1 border rounded-full ${page === idx + 1 ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>
                   <div className='w-full block mx-auto p-10'>
                {
                    interests && interests.length >= 5 &&
                    <button 
                        onClick={() => handleClick()} 
                        className="w-1/4 mx-auto block bg-blue-500 text-white py-1 px-3 rounded"
                    >
                        Add Interests
                            </button>
                } 
                 </div>
            </div>
        </div>
    )
};

export default SelectCauses;
