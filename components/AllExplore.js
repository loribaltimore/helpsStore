"use client"
import AltNav from 'components/AltNav';
import {  useContext } from 'react';
import { ExploreContext } from 'components/ExploreContext';
import SearchAccordion from 'components/SearchAccordion';
import ExploreResults from 'components/ExploreResults';

function NewExplore({ likedCharities, user, recommended }) {
    let { orgs, isLoading } = useContext(ExploreContext);

    return (
        <div className='relative z-20 p-5'>
            <div className="flex flex-col space-y-4 ">
                <SearchAccordion />
                {
                    isLoading ?
                        <div className="flex justify-center z-20">
                            <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-indigo-500 rounded-full"></div>
                        </div>
                        : orgs !== undefined ?
                            <ExploreResults resource={orgs} type={'search'} user={user} likedCharities={likedCharities} />
                            : 
                            <ExploreResults resource={recommended} type={'recommended'} user={user} likedCharities={likedCharities} />
                }
            </div>
        </div>
    );
};

export default NewExplore;
