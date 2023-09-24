import { useState } from 'react';

function FilterBtn({ setFilter, setIsRender, isRender }) {

    let handleClick = () => {
        setIsRender(!isRender);
    };

    let handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <button onClick={() => handleClick()} className="block border border-black  rounded focus:outline-none ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 4v1.5h18V4H3zm3 4v1.5h12V8H6zm3 4v1.5h6V12H9zm0 4v1.5h6V16H9z"></path>
                </svg>
            </button>
        </div>
    )
};

export default FilterBtn;
