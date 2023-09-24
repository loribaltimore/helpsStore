import { useState } from 'react';
import FilterBtn from './FilterBtn';

function QueueSearch({ setCurrentQueue }) {
    let [search, setSearch] = useState('');
    let [filter, setFilter] = useState('Name');
    let [isRender, setIsRender] = useState(false);

    let handleChange = (event) => {
        setSearch(event.target.value);
    };

    let handleClick = (event) => {
        setFilter(event.target.id);
    };

    let handleKeyPress = async (event) => {
        if (event.key === 'Enter' && search !== '') {
            let response = await fetch(`/api/queue?search=${search}&filter=${filter}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(async (data) => {
                data = await data.json();
                    setCurrentQueue(data.searchResults);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="block items-center text-black font-extralight" onKeyDown={(event) => handleKeyPress(event)} style={{ width: '22%' }}>
            <div className="flex space-x-3">
                <input
                    placeholder={`Search By ${filter}`}
                    value={search}
                    onChange={(event) => handleChange(event)}
                    className="p-2 w-full block rounded "
                />
                <FilterBtn setFilter={setFilter} setIsRender={setIsRender} isRender={isRender} />

            </div>
            
            <div className=" min-h-[3rem]">
                {
                    isRender ?
                        <div className='flex p-2 text-center'>
                <div className="w-3/12">
                    <div
                        className="cursor-pointer"
                        id="Name"
                        onClick={(event) => handleClick(event)}
                    >
                        Name
                    </div>
                </div>
                <div className="w-3/12">
                    <div
                        className="cursor-pointer"
                        id="Receipt"
                        onClick={(event) => handleClick(event)}
                    >
                        Receipt
                    </div>
                </div>
                <div className="w-3/12">
                    <div
                        className="cursor-pointer"
                        id="Manufacturer"
                        onClick={(event) => handleClick(event)}
                    >
                        Location
                    </div>
                </div>
                <div className="w-3/12">
                    <div
                        className="cursor-pointer"
                        id="Tracking"
                        onClick={(event) => handleClick(event)}
                    >
                        Tracking
                    </div>
                            </div>
                            </div>: null
                          }
                    </div> 
                      
        </div>
    );
}

export default QueueSearch;
