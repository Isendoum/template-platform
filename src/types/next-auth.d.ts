declare module "next-auth" {
  interface Session {
    jwt?: string;
    refreshToken?: string;
    cookie?: string[];
  }
  interface User {
    cookie: string[];
  }

  interface Account {
    jwt?: string;
    refreshToken?: string;
    cookie: string[];
  }
}
