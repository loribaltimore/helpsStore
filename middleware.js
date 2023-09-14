import {NextResponse} from 'next/server';
import { headers } from 'next/headers';

export async function middleware(request) {
    console.log(process.env.NODE_ENV === 'development')
    const cookie = headers().get('cookie') ?? '';
    const regex = /_next|\/api\/auth/g;
    if (request.url !== `${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/auth/signin`) {
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
                console.log(`redirecting to${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/auth/signin`);
                return NextResponse.redirect(`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/auth/signin`);
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
                    return false;
                }
            }).catch(err => console.log(err));
        if (response) {
            return NextResponse.redirect(`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL}/dashboard`)
        };
    }
}

