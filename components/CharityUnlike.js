import React, { useContext, useState } from 'react';
import unlikeCharity from 'lib/unlikeCharity';
import { ExploreContext } from 'components/ExploreContext';

function CharityUnlike({ org, recommendedCause }) {
    let { currentCause, setAllLiked } = useContext(ExploreContext);
    let [isHover, setIsHover] = useState(false);
    let causeToUse = recommendedCause || currentCause;

    let handleClick = async () => {
        await unlikeCharity(org, causeToUse)
            .then(data => { setAllLiked(data.allLiked) }).catch(err => console.log(err));
    };

    return (
        <div className="text-center cursor-pointer">
            <button className="px-3 py-1 shadow-xl text-black rounded bg-gray-100 hover:scale-105 active:scale-100">Unlike</button>
        </div>
    )
};

export default CharityUnlike;
