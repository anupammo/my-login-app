// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db"; // Import your database helper
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john_doe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Please provide both username and password.");
        }

        const [rows]: any = await db.query(
          "SELECT * FROM users WHERE username = ?",
          [credentials.username.trim()]
        );

        if (!rows.length) {
          throw new Error("Invalid username or password.");
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(
          credentials.password.trim(),
          user.password_hash
        );

        if (!isPasswordValid) {
          throw new Error("Invalid username or password.");
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // Explicitly use "jwt" for type compatibility
    maxAge: 30 * 24 * 60 * 60, // Session lifetime (30 days)
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set properly
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
