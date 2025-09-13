import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (Credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: Credentials?.email,
            password: Credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await response.json();

        if (payload.message === "success") {
          const decode: { id: string } = jwtDecode(payload.token);

          return {
            id: decode.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message || "faild");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userid = user?.id;
        token.user = user?.user;
        token.token = user?.token;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.userid = token.userid;

      return session;
    },
  },
};
