import Image from 'next/image';

export default function BankThumbnail({connection}) {
    return (
        <div>
            <div className="bg-white rounded-lg w-1/4 h-[10rem]">
            <img src="/guy.jpg" className='blur-lg'/>
            </div>
        </div>
    )
};


create bank => based on likedBy => show blurred photo and rating
add stripe => give option for seeing date rank and reviews => option for seeing all of bannk
