import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";

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
        id: { label: "Id", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //console.log("認証関数が呼び出されました。認証情報:", credentials);

        if (!credentials?.id || !credentials?.password) {
          // console.log("認証情報が不足しています。");
          return null;
        }

        // 権限者用とゲスト用の認証情報を確認
        if (
          credentials.id === process.env.NEXTAUTH_ADMIN_ID &&
          credentials.password === process.env.NEXTAUTH_ADMIN_PW
        ) {
          //console.log("権限者として認証されました。");
          return { id: "1", name: "管理者", role: "admin" };
        } else if (
          credentials.id === process.env.NEXTAUTH_GUEST_ID &&
          credentials.password === process.env.NEXTAUTH_GUEST_PW
        ) {
          //console.log("ゲストユーザーとして認証されました。");
          return { id: "2", name: "ゲストユーザー", role: "guest" };
        }
        //console.log("認証情報が一致しません。");
        return null;
      },
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
