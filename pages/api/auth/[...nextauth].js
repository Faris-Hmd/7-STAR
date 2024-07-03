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
      const admins = await getFireDocs("admins");
      // console.log(admins);
      const isAdmin = admins?.find(
        (admin) => session.user.email === admin?.email
      );
      const querySnapShot = await getDocs(
        query(collection(db, "users"), where("email", "==", session.user.email))
      );
      // console.log(session, "clb");

      if (querySnapShot.empty) {
        console.log(session, "empty clb");

        let newUser = {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        };
        const newU = await addDoc(collection(db, "users"), newUser);
        return {
          ...session,
          user: {
            ...session.user,
            id: newU.id,
            role: isAdmin ? "admin" : "",
          },
        };
      }
      const userInfo = getDataFromQuery(querySnapShot);
      // // console.log("callback");
      // // console.log(admins);
      // const isAdmin = admins?.find(
      //   (admin) => userInfo[0].email === admin?.email
      // );

      return {
        ...session,
        user: {
          ...session.user,
          id: userInfo[0].id,
          role: isAdmin ? "admin" : "",
        },
      };
    },
  },
};

export default NextAuth(authOptions);
