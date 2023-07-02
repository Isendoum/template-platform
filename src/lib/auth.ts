import type { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //2 continues here
      console.log("SignIn", user);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      console.log("session:", session);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("Token: ", token);
      console.log("Token profile: ", profile);
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // const res = await supabase.auth.signInWithPassword({
          //   email: credentials?.email!,
          //   password: credentials?.password!,
          // });

          const user = {
            id: "1",
            email: credentials?.email,
            name: "User12345",
          };
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
};
