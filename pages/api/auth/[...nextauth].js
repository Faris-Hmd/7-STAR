import NextAuth from "next-auth";
import GooglepProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GooglepProvider({
      clientId:
        "180375610396-7c7vrtdko0rn00raqpco1f1b2lfbncvi.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
