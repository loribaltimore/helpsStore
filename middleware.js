
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
export async function middleware(request) {
    const cookie = headers().get('cookie') ?? '';
    const regex = /_next|\/api\/auth/g;
    if (request.url !== `${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/auth/signin` && request.url !== `${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/`) {
        if (request.url !== `${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/api/auth/session`
            && !request.url.match(regex)) {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/api/auth/session`, {
                headers: {
                    cookie
                },
            }).then(async data => {
                const session = await data.json();
                if (Object.keys(session).length > 0) {
                    return true;
                } else {
                    return false;
                }
            }).catch(err => console.log(err));
            if (response) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/`);
            }
        } 
    } else {
        const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/api/auth/session`, {
                headers: {
                    cookie
                },
        }).then(async data => {
                const session = await data.json();
                if (Object.keys(session).length > 0) {
                    return true;
                } else {
                    console.log('jeepers')
                    return false;
                }
            }).catch(err => console.log(err));
        if (response) {
            console.log('jeepers')
            return NextResponse.redirect(`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/home`)
        };
    }
};