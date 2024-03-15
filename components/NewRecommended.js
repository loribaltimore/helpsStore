import NewCharityCard from './NewCharityCard';
import { ExploreContext } from './ExploreContext';
import { MainContext } from 'components/MainContext';
import { useContext } from 'react';

function NewRecommended({ recommended, likedCharities }) {
    const { allLiked } = useContext(ExploreContext);
    const { currentUser} = useContext(MainContext);
    const key = Object.keys(recommended)[0];
    return (
        <div className="w-full space-y-4">
            <div>
                <h2 className="text-3xl p-3">Based on your interests in {key}</h2>
            </div>
            <div className='flex overflow-scroll'>
{
                recommended[key].map((element, index) => {
                    const liked = JSON.parse(currentUser).charities.liked.orgs.indexOf(element.name) > -1;
                    return <NewCharityCard key={index} org={element} type={'like'} currentUser={currentUser} liked={liked} recommendedCause={key} />
                })
            }
            </div>
            
        </div>
    )
}

export default NewRecommended;
