import NextAuth from "next-auth"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from 'models/clientPromise';
import GoogleProvider from "next-auth/providers/google";
import database from 'models/database';
import User from 'models/userSchema';
import Session from 'models/sessionSchema';
import mongoose from 'mongoose'

const url = process.env.NODE_ENV === 'development' ? `${process.env.LOCAL_URL}/api/auth/callback/google`: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`;
// configure auth options below
export const authOptions = {
  // Authentication providers - should be Google and Apple
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: url
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/dashboard'
    },
    async session({ session, user, token, trigger, newSession }) {
      await database();
      const currentUser = await User.findOne({ email: user.email }).then(data => {
        {return data}
     }).catch(err => console.log(err));
      const convertedId = new mongoose.Types.ObjectId(currentUser.id);
      session = await Session.findOne({ userId: convertedId }).then(data => { return data }).catch(err => console.log(err));
      if (newSession) {
        session.flash = newSession.flash;
       await session.save();
      };
      return  session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    newUser: '/user/registration'
  },
  debug: true,
}

// export NextAuth object with options as parameter
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}