import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "../../connection";
import { comparePasswords } from "./comparePasswords";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 1 * 60 * 60, // 1 hours
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      //   credentials: {
      //     email: {
      //       label: "Email",
      //       type: "email",
      //       placeholder: "example@example.com",
      //     },
      //     password: { label: "Password", type: "password" },
      //   },
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // const user = {
        //   id: "1",
        //   name: "nonpawiz",
        //   role: "user",
        //   email: "jsmith@example.com",
        // };
        const { username, password } = credentials as any;
        const user = await connection("users").where("name", username).first();

        try {
          const passwordMatch = await comparePasswords(password, user.password);
          return user;
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      // session.user = {
      //   ...session.user,
      //   hee: "sdsadsad",
      // };

      return session;
    },
    // session: ({ session, token }) => {
    //   // console.log("Session Callback", { session, token });
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.id,
    //       randomKey: token.randomKey,
    //     },
    //   };
    // },
    // jwt: ({ token, user }) => {
    //   // console.log("JWT Callback", { token, user });
    //   if (user) {
    //     const u = user as unknown as any;
    //     return {
    //       ...token,
    //       id: u.id,
    //       randomKey: u.randomKey,
    //     };
    //   }
    //   return token;
    // },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};
