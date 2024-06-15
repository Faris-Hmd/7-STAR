import NextAuth from "next-auth";
import GooglepProvider from "next-auth/providers/google";
import { getDataFromQuery, getFireDoc } from "../../../lib/getFireData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    GooglepProvider({
      clientId:
        "180375610396-7c7vrtdko0rn00raqpco1f1b2lfbncvi.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token, user }) {
      const querySnapShot = await getDocs(
        query(collection(db, "users"), where("email", "==", session.user.email))
      );
      const userInfo = getDataFromQuery(querySnapShot);
      // console.log("callback");
      // console.log(userInfo[0]);
      return {
        ...session,
        user: {
          ...user,
          ...userInfo[0],
        },
      };
    },
  },
};

export default NextAuth(authOptions);
