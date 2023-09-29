import Link from 'next/link';

function ExplorePanel({ length }) {
    return (
        <div className={`w-${length}/4 m-1 h-100 border border-black font-extralight text-black bg-white rounded`}>
            <div className="bg-beige text-sm text-center py-1 ">Explore</div>
            <div className="space-y-10">
            <img src='/img/explorePhotoSunrise.jpeg' className='w-full h-[10rem] border-t border-b border-black object-center object-cover'/>
            <p className="text-black text-sm px-2 text-center py-5 text-center mx-auto">Youll want to fill out your collection of charities that you like.
            That way you can come back here and select them to donate to when you make a purchase. Press "Explore" to get started!
                </p>
            </div>
            <div className="block mx-auto text-center p-4 my-10">
                    <Link href="/explore" className="px-10 py-6  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none rounded">Explore</Link>
                </div>
        </div>
    )
};

export default ExplorePanel;
