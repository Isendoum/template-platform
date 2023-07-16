import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

import { signOut } from "next-auth/react";
import { axiosInstance } from "@/lib/axios/index";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user?.cookie) {
        account.cookie = user?.cookie;
      }
      return true;
    },
    async session({ session, user, token }) {
      if (token?.cookie) {
        session.cookie = token.cookie;
        session.jwt = token.cookie[0].split("=")[1].split(";")[0];
        session.refreshToken = token.cookie[1].split("=")[1].split(";")[0];
      } else {
        session.jwt = null;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.cookie) {
        token.cookie = account.cookie;
      }

      if (
        Date.now() <
        new Date(token.cookie[0].split("Expires=")[1].split(";")[0])
      ) {
        // Return previous token if the access token has not expired yet
        return token;
      }

      try {
        const refreshTokenResponse = await (
          await axiosInstance()
        ).post("/auth/refreshToken", {
          refreshToken: token.cookie[1].split("=")[1].split(";")[0],
        });
        console.log(refreshTokenResponse.data.accessToken);
        token = `${refreshTokenResponse.data.tokenType} ${refreshTokenResponse.data.accessToken}`;
        return refreshTokenResponse.data.accessToken;
      } catch (error) {
        console.log(error);
        // Replace this with the appropriate code to clear cookies

        // You can also consider refreshing the page to reset the application state
        await signOut({ redirect: true });
        return null;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:8080/auth/signIn", {
            username: credentials?.username,
            password: credentials?.password,
          });

          // throw new Error("testing error");
          // const res1 = await axios.get("http://localhost:8080/auth/get");
          const user = {
            id: res.data.id,
            email: res.data.email,
            username: res.data.username,
            name: res.data.username,
            cookie: res.headers["set-cookie"],
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
