import {NextResponse} from 'next/server';
import { headers } from 'next/headers';

export async function middleware(request) {
    const cookie = headers().get('cookie') ?? '';
    const regex = /_next|\/api\/auth/g;
    if (request.url !== `${process.env.LOCAL_URL}/auth/signin`
        && request.url !== `${process.env.LOCAL_URL}/api/auth/session`
    && !request.url.match(regex)) {
        const response = await fetch(`${process.env.LOCAL_URL}/api/auth/session`, {
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
            return NextResponse.redirect(`${process.env.LOCAL_URL}/auth/signin`);
        }
    } else {
        return NextResponse.next();
    }
}

