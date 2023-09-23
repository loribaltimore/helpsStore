import './globals.css'
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Inter } from 'next/font/google'
import Nav from '../components/Nav';
const inter = Inter({ subsets: ['latin'] })
import { NextAuthProvider } from 'components/NextAuthProvider';
import { headers } from 'next/headers'
import Flash from 'components/Flash';
import { ReviewProvider } from 'components/ReviewContext';
import { RegistrationProvider } from 'components/RegistrationContext';
import { NotifProvider } from 'components/NotifContext';

import User from 'models/userSchema';
export const metadata = {
  title: 'helps',
  description: 'A New Way to Give',
}
export const dynamic = 'force-dynamic';
const url = process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.NEXTAUTH_URL;

async function getSession(cookie) {
  const response = await fetch(`${url}/api/auth/session`, {
    headers: {
      cookie,
    },
  }).then(async data => { return data}).catch(err => console.log(err));
  const session = await response.json();
  return Object.keys(session).length > 0 ? session : null;
};

async function getNotifications(userId) {
  const currentUser = await User.findById(userId).then(data => data).catch(err => console.log(err));
  return currentUser.notifications;
};


export default async function RootLayout({ children }) {
  const session = await getSession(headers().get('cookie') ?? '').then(data => {
    if (data) {
      return data
    } else {
      return null
    };
  }).catch(err => console.log(err));

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden` } style={{backgroundColor: 'gray'}}>
        <NextAuthProvider session={session}>
          <RegistrationProvider>
            <ReviewProvider>
              <NotifProvider>
              <Nav>
            {
             session && session.flash && session.flash.message ?
              <Flash flash={session.flash} /> : null
            }
            {children}
              </Nav>
              </NotifProvider>
            </ReviewProvider>
            </RegistrationProvider>
          </NextAuthProvider>
      </body>
    </html>
  )
}
