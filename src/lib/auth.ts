import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import { auth } from "@/lib/firebaseAdmin";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 管理者用の認証
        if (
          credentials.email === process.env.NEXTAUTH_ADMIN_EMAIL &&
          credentials.password === process.env.NEXTAUTH_ADMIN_PW
        ) {
          return { id: "1", name: "管理者", role: "admin" };
        }

        // Firebase Authenticationのユーザー認証
        try {
          const userRecord = await auth.getUserByEmail(credentials.email);
          if (userRecord.passwordHash) {
            const isPasswordValid = await bcrypt.compare(credentials.password, userRecord.passwordHash);

            if (isPasswordValid) {
              return { id: userRecord.uid, name: userRecord.displayName, role: "user" };
            }
          } else {
            console.error("Password hash is missing for user:", credentials.email);
          }
        } catch (error) {
          console.error("Firebase authentication error:", error);
          return null;
        }

        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};