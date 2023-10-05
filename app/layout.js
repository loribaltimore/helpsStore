import './globals.css'
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { NextAuthProvider } from 'components/NextAuthProvider';
import { headers } from 'next/headers'
import Flash from 'components/Flash';
import { MainProvider } from 'components/MainContext';
import { ExploreProvider } from 'components/ExploreContext';
import { CheckoutProvider } from 'components/CheckoutContext';
import AltNav from 'components/AltNav';
import NewCart from 'components/NewCart';
import User from 'models/userSchema';
import { SignUpProvider } from '@/components/SignUpContext';


export const dynamic = 'force-dynamic';
const url = process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL;

export const metadata = {
  title: 'Helps',
  description: 'A New Way to Give',
};

async function getSession(cookie) {
  const response = await fetch(`${url}/api/auth/session`, {
    headers: {
      cookie,
    },
  }).then(async data => { return data}).catch(err => console.log(err));
  const session = await response.json();
  let currentUser;
  if (Object.keys(session).length > 0) {
  const currentUser = await User.findById(session.userId).then(data => {return data}).catch(err => console.log(err));
    return {session, currentUser}
  } else {return null}
};

export default async function RootLayout({ children }) {
  let session;
  let currentUser;
  const sessionObj = await getSession(headers().get('cookie') ?? '').then(data => {
    if (data) {
      return data
    } else {
      return null
    };
  }).catch(err => console.log(err));
  if (sessionObj) {
    session = sessionObj.session;
    currentUser = sessionObj.currentUser;
  }
  return (
    <html lang="en">
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon.ico" />
      <body className={`${inter.className} relative block bg-[#fa5555] w-full min-w-full`}>
        <div className='w-1/2 '>
              <svg
              className="absolute -z-100 w-[70%] inset-y-0 hidden h-full fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon className=''  points="0,0 90,0 50,100 0,100" />
            </svg>
                  </div>
        <MainProvider currentUser={JSON.stringify(currentUser)} serverCart={session ? session.cart : null}>
          {
            session ?
              <AltNav cart={session ? session.cart : null} />
              : null
          }
            <NextAuthProvider session={session}>
            {
             session && session.flash && session.flash.message ?
              <Flash flash={session.flash} /> : null
          }
              <CheckoutProvider>
                <ExploreProvider>
                  <div className='mx-auto my-auto w-1/4 h-1/4'>
                    <NewCart cart={session ? session.cart : null}/>
                </div>
                <SignUpProvider>
                  
                  
                        {children}
                </SignUpProvider>
                </ExploreProvider>
              </CheckoutProvider>
          </NextAuthProvider>
        </MainProvider>
      </body>
    </html>
  )
}