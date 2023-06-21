import NextAuth from "next-auth";
import { User } from "./intefaces";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    token?: string;
    error?: string;
    user?: User;
  }

  interface Session {
    user: User;
  }
}
