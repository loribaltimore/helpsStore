function CharityShowcase({ spotlight }) {
    return (
        <div className="border border-black w-11/12 bg-white my-10 rounded-lg h-40 relative mx-auto">
            <h3 className="text-xl font-semibold">{spotlight.name}</h3>
            <h3 className="text-lg">{spotlight.description}</h3>
        </div>
    );
}

export default CharityShowcase;
