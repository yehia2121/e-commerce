import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface User {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
    id: string
  }

  interface Session {
    user: User.user
    userid: User.id
  }
}
