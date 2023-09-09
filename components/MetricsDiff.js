

export default function MetricsDiff({ type }) {
    return (
        <div>
        {
            type === 'down' ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(148, 0, 11, 0.8)" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 align-top">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg> :
                type === 'up' ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(41, 150, 0, 0.8)" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" className=""/>
                        </svg> : type === 'none' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg> : null
            }
    </div>
    )
};