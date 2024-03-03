import NextAuth from "next-auth"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from 'models/clientPromise';
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
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
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
      },
      async authorize(credentials, req) {
        const {username} = credentials;
        await database();
        let user = await User.find({email: username}).then(data => data[0]).catch(err => console.log(err));
        if (user) {
          user = { id: user._id, name: user.name, email: user.email };
          return user;
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: "THISISASECRET",
    // You can set the max age for the JWT here
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/home'
    },
    async session({ session, user, token, trigger, newSession }) {
      user = user || session.user;
      await database();
      const currentUser = await User.findOne({ email: user.email }).then(data => {
        {return data}
      }).catch(err => console.log(err));
      if (session && !session.userId){
        session.userId = currentUser.id
      };

      const convertedId = new mongoose.Types.ObjectId(currentUser.id);
      session = await Session.findOne({ userId: convertedId }).then(data => {
        return data
      }).catch(err => console.log(err));
      const allSessions = await Session.find({});
      console.log(allSessions.map((element) => {
        return element.userId;
      }))
      if (newSession) {
        session.flash = newSession.flash;
        await session.save();
      };
      console.log(session);
      return  session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    newUser: '/registration'
  },
  debug: true,
}

// export NextAuth object with options as parameter
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}