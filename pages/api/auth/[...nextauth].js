import NextAuth from "next-auth";
import GooglepProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GooglepProvider({
      clientId:
        "377768825451-f8difho9sd4vuhbl3g5e6li03olf66rb.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
