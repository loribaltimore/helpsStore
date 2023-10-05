import axios from 'axios';
import { useContext } from 'react';
import { ExploreContext } from './ExploreContext';

function CharitySearch() {
    const { setSearch, search, setOrgs } = useContext(ExploreContext);
    
    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const performSearch = async () => {
        if (search !== ''){
                const response = await fetch(`/api/charities/search/${search}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }).then(async data => { 
                        data = await data.json();
                        setOrgs(data.searchResults);
                    }).catch(err => console.log(err));
        }
    };

    return (
        <div className="flex w-1/3 justify-between items-center space-x-4 z-20">
            <div className="flex-1 z-20">
                <input 
                    className="border border-black rounded p-2 w-full text-black font-extralight"
                    placeholder="Search By Organization" 
                    value={search} 
                    onChange={handleChange} 
                />
            </div>
            <button 
                className="bg-white border border-black text-black px-4 py-2 rounded"
                onClick={performSearch}
            >
                Search
            </button>
        </div>
    );
}

export default CharitySearch;
