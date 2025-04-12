// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john_doe" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const [rows]: any = await db.query(
          "SELECT * FROM users WHERE username = ?",
          [credentials?.username?.trim()]
        );

        if (!rows.length) {
          throw new Error("Invalid username or password");
        }

        const user = rows[0];
        const isValid = await bcrypt.compare(credentials!.password.trim(), user.password_hash);

        if (!isValid) {
          throw new Error("Invalid username or password");
        }

        // Return only necessary fields. Make sure you include the user's id.
        return { id: user.id, name: user.username, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as number;
      }
      return session;
    }
  }
};
