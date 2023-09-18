import { useState } from 'react';

export default function Carousel({ photos }) {
    const [counter, setCounter] = useState(0);

    const nextPhoto = () => {
        if (counter + 1 <= photos.length -1) {
             setCounter(prev => prev + 1)
        };
    };

    return (
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded bg-gray-100">
            {
                photos ?
                    <img
                        src={`/api/user/photos/${photos[counter]}`}
                        alt="Interior of light green canvas bag with padded laptop sleeve and internal organization pouch."
                        className="object-cover object-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                        onClick={() => nextPhoto()}
                        />
: null
            }
         </div>
    )
};