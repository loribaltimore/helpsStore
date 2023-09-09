"use client"
import { signIn } from "next-auth/react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useContext } from 'react';
import { ReviewContext } from 'components/ReviewContext';

export default function SigninBtn({ providerId, providerName }) {
    const {setIsLoading} = useContext(ReviewContext);
    return (
        <div className="w-3/4 mx-auto">
            <GoogleLoginButton onClick={() => {
                 setIsLoading(true);
                    try {
                        signOut()
                    } catch {
                        console.log('error signing out');
                    } finally {
                        setIsLoading(false);
                    }
                signIn(providerId, providerName)
            }
            } />
        </div>
    )
};