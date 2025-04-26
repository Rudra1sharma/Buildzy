import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      access_token?: string | null; 
      username?: string | null;
      avatar_url?: string | null;
    };
  }

  interface User extends DefaultUser {
    access_token?: string;
    username?: string;
    avatar_url?: string;
  }
}