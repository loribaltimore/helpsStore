"use client"
import { createContext, useState } from 'react';

export let ExploreContext = createContext();

export function ExploreProvider(props) {
    let [orgs, setOrgs] = useState(undefined);
    let [currentCause, setCurrentCause] = useState(undefined);
    // let [currentPage, setCurrentPage] = useState(1);
    let [search, setSearch] = useState('');
    let [cause, setCause] = useState(undefined);
    let [searchResults, setSearchResults] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [isExpand, setIsExpand] = useState(false);
    let [pageCalc, setPageCalc] = useState((1 - 1) * 10);
    let [allLiked, setAllLiked] = useState(undefined);

    return (
        <ExploreContext.Provider  value={{
            search, setSearch, cause, setCause, orgs, setOrgs,
            searchResults, setSearchResults, pageCalc, setPageCalc,
            isLoading, setIsLoading, isExpand, setIsExpand, allLiked, setAllLiked,
            currentCause, setCurrentCause}}>
            {props.children}
        </ExploreContext.Provider>
    )
};


