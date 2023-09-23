import Link from 'next/link';

function ExplorePanel({ length }) {
    return (
        <div className={`w-${length}/4 m-1 h-100 border border-black font-extralight text-black bg-white rounded`}>
                        <div className="bg-beige text-sm text-center py-1 ">Explore</div>
            <img src='/img/explorePhotoSunrise.jpeg' className='w-full h-[20rem] border-t border-b border-black object-center object-cover'/>
                
            <p className="text-black text-sm p-3 text-center p-3 w-1/2 text-center mx-auto">Youll want to fill out your collection of charities that you like.
            That way you can come back here and select them to donate to when you make a purchase. Press "Explore" to get started!
            </p>
            <div className="block mx-auto text-center p-4">
                    <Link href="/explore" className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none rounded">Explore</Link>
                </div>
        </div>
    )
};

export default ExplorePanel;
