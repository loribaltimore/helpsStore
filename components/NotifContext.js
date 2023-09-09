"use client"
import { createContext, useState } from 'react';

export const NotifContext = createContext(null);

export function NotifProvider({ children }) {
      const [pReviews, setPReviews] = useState(false);
      const [pChat, setPChat] = useState(false);
      const [pBank, setPBank] = useState(false);
    return (
        <NotifContext.Provider value={{pBank, setPBank, setPChat, pBank, setPReviews, pReviews, pChat}}>
                {children}
    </NotifContext.Provider>
    )
}