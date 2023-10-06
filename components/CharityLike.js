import React, { useContext } from 'react';
import { ExploreContext } from './ExploreContext';
import likeCharity from 'lib/likeCharity';
import {MainContext} from 'components/MainContext';

function CharityLike(props) {
    let { org, recommendedCause } = props;
    let { currentCause, setAllLiked } = useContext(ExploreContext);
    const { currentUser } = useContext(MainContext);
    
    const handleClick = async () => {
        let cause = currentCause || recommendedCause;
        await likeCharity(JSON.parse(currentUser)._id, org, cause).then(data => {
            setAllLiked(data)
        }).catch(err => console.log(err));
    };
    return (
            <button className="px-3 py-1 shadow-xl text-black rounded bg-gray-100 hover:scale-105 active:scale-100" onClick={handleClick}>Like</button>
    );
}

export default CharityLike;
