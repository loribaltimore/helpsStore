"use client"
import { createContext, useState, useInsertionEffect } from "react";

const ReviewContext = createContext();

function ReviewProvider({ children }) {
    const [currentMongoConnection, setCurrentMongoConnection] = useState('');
    const [connection, setConnection] = useState('');
    const [showReviews, setShowReviews] = useState(false);
    const [isBank, setIsBank] = useState(false);
    return <ReviewContext.Provider value={{
        currentMongoConnection, connection,
        setCurrentMongoConnection, showReviews, setShowReviews, setConnection,
        isBank, setIsBank
    }}>
        {children}
    </ReviewContext.Provider>
};

export { ReviewProvider, ReviewContext };

