import NewRecommended from './NewRecommended';
import NewCharityCard from './NewCharityCard';
import { useContext } from 'react';
import { ExploreContext } from './ExploreContext';

function ExploreResults({ type, resource, user, likedCharities }) {
    let { pageCalc, setPageCalc, setIsLoading } = useContext(ExploreContext);

    let handleChange = (event) => {
        setIsLoading(true);
        window.scrollTo(0, 0);
        setPageCalc((parseInt(event.target.innerText) - 1) * 10);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-wrap p-5 font-extralight">
            {
                type === 'search'
                    ? resource.slice(pageCalc, pageCalc + 12).map((element, index) => {
                        let liked = false;
                        if (likedCharities.indexOf(element.name) > -1) {
                            liked = true;
                        }
                        return <NewCharityCard org={element} type={'like'} liked={liked} currentUser={user} />
                    })
                    : resource.map((element, index) => {
                        return <NewRecommended recommended={element} currentUser={user} likedCharities={likedCharities} />
                    })
            }
            {
                type === 'search'
                    ? <div className="w-full flex justify-center items-center mt-4">
                        placeholder
                        {/* Pagination from MUI used here as there isn't a direct Tailwind equivalent */}
                        {/* <Pagination count={8} size="large" onChange={handleChange} /> */}
                    </div>
                    : ''
            }
        </div>
    )
}

export default ExploreResults;
