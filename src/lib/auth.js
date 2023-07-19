import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

import { signOut } from "next-auth/react";
import { axiosInstance } from "./axios";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user?.cookie && account) {
        account.cookie = user?.cookie;
      }
      return true;
    },
    async session({ session, user, token }) {
      if (token?.cookie) {
        if (!session.cookie) {
          session.cookie = token.cookie;
        }
        session.jwt = token.cookie[0].split("=")[1].split(";")[0];
        session.refreshToken = token.cookie[1].split("=")[1].split(";")[0];
      } else {
        session.jwt = null;
      }
      return session;
    },
    async jwt({ token, user, trigger, account, profile, isNewUser }) {
      if (account?.cookie) {
        token.cookie = account.cookie;
      }

      if (token) {
        // Return previous token if the access token has not expired yet
        return token;
      }

      return null;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
        refreshToken: { label: "refreshToken", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (credentials.refreshToken) {
            console.log("in refreshtoken");
            const res = await axios.post(
              `${process.env.SERVER_URL}auth/refreshToken`,
              {
                refreshToken: credentials?.refreshToken,
              }
            );
            console.log("Refresh token next auth", res.data);

            const user = {
              id: res.data.id,
              email: res.data.email,
              username: res.data.username,
              name: res.data.username,
              cookie: res.headers["set-cookie"],
            };
            return user;
          } else {
            console.log("in credentials");
            const res = await axios.post(
              `${process.env.SERVER_URL}auth/signIn`,
              {
                username: credentials?.username,
                password: credentials?.password,
              }
            );

            const user = {
              id: res.data.id,
              email: res.data.email,
              username: res.data.username,
              name: res.data.username,
              cookie: res.headers["set-cookie"],
            };
            return user;
          }
        } catch (error) {
          console.log("In next auth error");
          console.log("Error: ", error.message);
          return null;
        }
      },
    }),
  ],
};
