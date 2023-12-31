import { useState } from 'react';
import QueuePanel from './QueuePanel';
import QueueSearch from './QueueSearch';

function Queue({ populatedQueue, setIsQueue, isQueue }) {
    const [currentQueue, setCurrentQueue] = useState(JSON.parse(populatedQueue));
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(currentQueue.length / itemsPerPage);

    const handleClick = async (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const queueSlice = currentQueue.slice(startIndex, endIndex);
        setCurrentQueue(queueSlice);
        window.scroll(0, 0);
    };

    const renderPagination = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 mx-1 rounded-lg border ${
                        i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                    }`}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };
    return (
        <div className='space-y-3 p-3'>
            <button 
                    className="text-black rounded border border-black px-3 py-1 focus:outline-none"
                    onClick={() => setIsQueue(!isQueue)}>
                    back
                </button>
            <QueueSearch setCurrentQueue={setCurrentQueue} />
            
            {currentQueue.map((element, index) => (
                !element.fulfillment.donation.allFulfilled?
                <QueuePanel
                    donation={element}
                    setCurrentQueue={setCurrentQueue}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    key={index}
                    historyAmt={2}
                /> : null
            ))}
            {/* <div className="flex justify-center mt-4">{renderPagination()}</div> */}
        </div>
    );
}

export default Queue;
