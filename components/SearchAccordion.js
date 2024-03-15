import React, { useState, useContext } from 'react';
import AltCause from './AltCause';
import CharitySearch from './CharitySearch';
import { ExploreContext } from './ExploreContext';

function SearchAccordion({}) {
  const { setSearch, setSearchResults, setOrgs, setCause, setIsExpand, isExpand} = useContext(ExploreContext);
  const [expandCharity, setExpandCharity] = useState(false);
  const handleClick = () => {
    setSearch('');
    setSearchResults([]);
    setOrgs(undefined);
    setCause(undefined);
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear
      </button>

      <div className="rounded shadow-xl md:w-3/4">
        <button 
          className="flex rounded justify-between items-center w-full px-4 py-2 bg-white text-black font-extralight hover:bg-gray-200 focus:outline-none"
          onClick={() => {
            setExpandCharity(!expandCharity)
          }}
        >
          Search By Organization
          <span className={`transform ${expandCharity ? 'rotate-180' : ''} transition-transform`}>▼</span>
        </button>
        {expandCharity && <div className="p-4"><CharitySearch /></div>}
      </div>

      <div className="shadow-xl rounded shadow-xl md:w-3/4">
        <button 
          className="flex rounded shadow-xl justify-between items-center w-full px-4 py-2 bg-white text-black font-extralight hover:bg-gray-200 focus:outline-none"
          onClick={() => setIsExpand(!isExpand)}
        >
          Search By Cause
          <span className={`transform ${isExpand ? 'rotate-180' : ''} transition-transform`}>▼</span>
        </button>
        {isExpand && <div className="rounded"><AltCause setIsExpand={setIsExpand} /></div>}
      </div>
    </div>
  );
}

export default SearchAccordion;
