function CharityDescription({ org }) {
    return (
        <div className="font-extralight p-3 ">
            <div className="mb-4 ">
                <div className="bg-beige text-md text-center py-1 ">{org.name.length <= 35 ? org.name : org.name.slice(0, 35)+'...'}</div>
                <p className="text-black text-xs p-3 text-center h-[7rem]">{org.description ? org.description.length <= 200 ? org.description : org.description.slice(0, 200) : 'This is a atest'}</p>
                <div className="block w-3/4 mx-auto text-center">
                <a href={org.profileUrl} className="text-md font-extralight text-blue-600 hover:underline">Visit Charity Page</a>
                </div>
            </div>
            <div className="flex justify-center">
                <img src={org.logoUrl} alt="Charity Logo" className="w-auto h-auto rounded-full object-cover object-center" />
            </div>
        </div>
    );
}

export default CharityDescription;
