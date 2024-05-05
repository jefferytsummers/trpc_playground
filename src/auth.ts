import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "./firebase";

// export const { handlers, auth, signIn, signOut } = NextAuth({
// adapter: FirestoreAdapter(firestore),
// })
