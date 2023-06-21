import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "../../connection";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
        // console.log({ user });

        if (password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};
