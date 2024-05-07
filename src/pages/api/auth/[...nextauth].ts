import { googleProvider } from "@/firebase";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: googleProvider.providerId,
      clientSecret: googleProvider.getScopes(),
    }),
  ],
};

export default NextAuth(authOptions);
