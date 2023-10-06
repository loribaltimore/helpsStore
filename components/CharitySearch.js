import axios from 'axios';
import { useContext } from 'react';
import { ExploreContext } from './ExploreContext';

function CharitySearch() {
    const { setSearch, search, setOrgs, orgs } = useContext(ExploreContext);
    
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
    console.log(orgs)
    return (
        <div className="flex w-1/3 justify-between items-center space-x-4 z-20 ">
            <div className="flex-1 z-20 bg-opacity-50 bg-white">
                <input 
                    className="shadow-xl border  rounded p-2 w-full text-black font-extralight"
                    placeholder="Search By Organization" 
                    value={search} 
                    onChange={handleChange} 
                />
            </div>
            <button 
                className="bg-gray-100 shadow-xl text-black px-4 py-2 rounded hover:scale-105 active:scale-100"
                onClick={performSearch}
            >
                Search
            </button>
        </div>
    );
}

export default CharitySearch;
