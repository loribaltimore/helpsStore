import charityCauses from 'util/charityCauses';
import { useState } from 'react';

function CauseSearch({ setSearchResults, cause }) {
    let [searchFor, setSearchFor] = useState('');

    let handleChange = (event) => {
        setSearchFor(event.target.value);
    };

    let filterCauses = () => {
        let searchTerm = new RegExp(`^${searchFor}`, 'ig');
        setSearchResults(charityCauses.filter(function (element) {
            return searchTerm.test(element);
        }));
    };

    let handleKeyPress = (event) => {
        if (event.key === 'Enter' && cause !== '') {
            filterCauses();
        }
    };

    let handleClick = () => {
        if (cause !== '') {
            filterCauses();
        }
    };

    return (
        <div className="flex w-1/3 items-center" onKeyDown={handleKeyPress}>
            <input 
                placeholder="Search By Causes" 
                value={cause} 
                onChange={handleChange} 
                className="flex-grow p-2 border border-black rounded font-extralight text-black" 
            />
            <button 
                onClick={handleClick}
                className="ml-2 px-4 py-2 bg-white text-black border border-black rounded hover:bg-blue-500"
            >
                Search
            </button>
        </div>
    );
}

export default CauseSearch;
