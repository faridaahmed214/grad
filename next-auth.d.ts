import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    name: string;
    email: string;  }

  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
    };
    accessToken: string;
  }

  interface JWT {
    _id: string;
    name: string;
    email: string;
    accessToken: string;
  }
}
