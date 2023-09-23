// import axios from 'axios';
import charityCauses from 'util/charityCauses';
import CauseSearch from 'components/CauseSearch';
import { ExploreContext } from 'components/ExploreContext';
import { useContext } from 'react';

function AltCause(props) {
    let { setCurrentCause, searchResults, setCause, setOrgs, setIsLoading, setIsExpand, setSearchResults } = useContext(ExploreContext);

    let isResult = {
        true: 'text-magenta-500',
        false: 'text-black'
    }

    let handleClick = async (event) => {
        setIsExpand(false);
        setIsLoading(true)
        setCause(event.target.innerText);
        setCurrentCause(event.target.innerText);
        await fetch(`/api/explore/charities/${event.target.innerText}`,{
            method: 'get',
        }).then(async data => { data = await data.json(); setOrgs(data.nonprofits) }).catch(err => console.log(err));
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);
    }

    return (
        <div className="bg-white">
            {/* <div>
                <CauseSearch setIsExpand={setIsExpand} setCause={setCause} setSearchResults={setSearchResults} />
            </div> */}
            {[[0, 16], [17, 33], [34, 49], [50, 66]].map((range, idx) => (
                <div key={idx} className="text-center w-1/4 inline-block">
                    {charityCauses.slice(...range).map((element, index) => {
                        let fontColor = searchResults.includes(element);
                        return (
                            <h4 key={index} className={`m-1 border border-black rounded cursor-pointer text-black font-extralight hover:scale-105`} onClick={(event) => handleClick(event)}>
                                {element}
                            </h4>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default AltCause;
