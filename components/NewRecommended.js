import NewCharityCard from './NewCharityCard';
import { ExploreContext } from './ExploreContext';
import { useContext } from 'react';

function NewRecommended({ recommended, currentUser, likedCharities }) {
    const { allLiked } = useContext(ExploreContext);
    const key = Object.keys(recommended)[0];

    return (
        <div className="w-full space-y-4">
            <div>
                <h2 className="text-3xl p-3">Based on your interests in {key}</h2>
            </div>
            <div className='flex'>
{
                recommended[key].map((element, index) => {
                    const liked = (allLiked || likedCharities).indexOf(element.name) > -1;
                    return <NewCharityCard org={element} type={'like'} currentUser={currentUser} liked={liked} recommendedCause={key} />
                })
            }
            </div>
            
        </div>
    )
}

export default NewRecommended;
