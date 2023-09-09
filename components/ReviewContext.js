"use client"
import { createContext, useState } from "react";

const ReviewContext = createContext();

function ReviewProvider({ children }) {
    const [currentMongoConnection, setCurrentMongoConnection] = useState(undefined);
    const [connection, setConnection] = useState('');
    const [showReviews, setShowReviews] = useState(false);
    const [isBank, setIsBank] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bankConnection, setBankConnection] = useState();
    return <ReviewContext.Provider value={{
        currentMongoConnection, connection,
        setCurrentMongoConnection, showReviews, setShowReviews, setConnection,
        isBank, setIsBank, showUpgrade, setShowUpgrade, showProfile, setShowProfile,
        isLoading, setIsLoading, bankConnection, setBankConnection
    }}>
        {children}
    </ReviewContext.Provider>
};

export { ReviewProvider, ReviewContext };

