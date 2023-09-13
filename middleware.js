import {NextResponse} from 'next/server';
import { headers } from 'next/headers';

export async function middleware(request) {
    let url;
    process.env.NODE_ENV === 'development' ? url = 'localhost:3000' : 'datr-lyrat.vercel.app';
    const cookie = headers().get('cookie') ?? '';
    const regex = /_next|\/api\/auth/g;
    if (request.url !== `${url}/auth/signin`) {
        if (request.url !== `${url}/api/auth/session`
            && !request.url.match(regex)) {
            const response = await fetch(`${url}/api/auth/session`, {
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
                return NextResponse.redirect(`${url}/auth/signin`);
            }
        } 
    } else {
        const response = await fetch(`${url}/api/auth/session`, {
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
            return NextResponse.redirect(`${url}/dashboard`)
        };
    }
}

