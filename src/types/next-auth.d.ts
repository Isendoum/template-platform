import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    jwt?: string;
    refreshToken?: string;
    cookie?: string[];
  }
}
