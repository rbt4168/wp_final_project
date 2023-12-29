import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub, Google ,CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      const name = token.name || session?.user?.username;
      console.log("```````````");
      console.log(session?.user)
      console.log("```````````");

      if (!email) return session;
      const [user] = await db
        .select({
          id: usersTable.displayId,
          provider: usersTable.provider,
          email: usersTable.email,
          username: usersTable.username,
        })
        .from(usersTable)
        .where(and(eq(usersTable.email, email.toLowerCase()), eq(usersTable.username, name as string)))
        .execute();

      return {
        ...session,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          provider: user.provider,
        },
      };
    },
    async jwt({ token, account }) {
      // Sign in with social account, e.g. GitHub, Google, etc.
      if (!account) return token;
      const { name, email } = token;
      const provider = account.provider;
      if (!name || !email || !provider) return token;
      // Check if the email has been registered
      if (provider === "github"){
        const [existedGithubUser] = await db
          .select({
            id: usersTable.displayId,
          })
          .from(usersTable)
          .where(and(eq(usersTable.email, email.toLowerCase()), eq(usersTable.provider, "github")))
          .execute();
        if (existedGithubUser){
          console.log("why are you here")
          return token;
        }
      }
      else if (provider === "google"){
        const [existedGoogleUser] = await db
          .select({
            id: usersTable.displayId,
          })
          .from(usersTable)
          .where(and(eq(usersTable.email, email.toLowerCase()), eq(usersTable.provider, "google")))
          .execute();
        if (existedGoogleUser) return token;
      }
      if (!(provider === "github" || provider ==="google")) return token;

      // Sign up
      await db.insert(usersTable).values({
        email: email.toLowerCase(),
        username: name,
        coins: Number(0),
        provider,
      });

      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
});
