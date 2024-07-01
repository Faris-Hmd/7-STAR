import NextAuth from "next-auth";
import GooglepProvider from "next-auth/providers/google";
import {
  getDataFromQuery,
  getFireDoc,
  getFireDocs,
} from "../../../lib/getFireData";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
      if (!querySnapShot.empty) {
        await addDoc(collection(db, "users"), {
          displayName: "زائر",
          email: "example@mail.com",
          photoUrl: "/images/cat-1.webp",
          userId:"5"

        });
      }
      const userInfo = getDataFromQuery(querySnapShot);
      const admins = await getFireDocs("admins");
      // console.log("callback");
      // console.log(admins);
      const isAdmin = admins?.find(
        (admin) => userInfo[0].email === admin?.email
      );
      return {
        ...session,
        user: {
          ...user,
          ...userInfo[0],
          role: isAdmin ? "admin" : "",
        },
      };
    },
  },
};

export default NextAuth(authOptions);
