import { useState } from 'react';
import Image from 'next/image';

export default function Carousel({ photos }) {
    
    const [counter, setCounter] = useState(0);
        console.log(photos[counter], 'HEREHERE')

    const nextPhoto = () => {
        if (counter + 1 <= photos.length -1) {
             setCounter(prev => prev + 1)
        };
    };

    return (
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded ">
            {
                photos ?
                    <Image
                        width={500}
                        height={500}
                        src={`https://datr-lyart.vercel.app/api/user/photos/${photos[counter]}`}
                        alt="Interior of light green canvas bag with padded laptop sleeve and internal organization pouch."
                        className="object-cover object-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                        onClick={() => nextPhoto()}
                        />
: null
            }
         </div>
    )
};