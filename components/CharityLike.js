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
        <div className="">
            <button className="px-2 bg-white text-black rounded border border-black" onClick={handleClick}>Like</button>
        </div>
    );
}

export default CharityLike;
