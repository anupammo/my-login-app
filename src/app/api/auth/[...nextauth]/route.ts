// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john_doe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Look up the user in your MySQL DB
        const [rows]: any = await db.query("SELECT * FROM users WHERE username = ?", [
          credentials?.username?.trim(),
        ]);
        if (!rows.length) {
          throw new Error("Invalid username or password");
        }

        const user = rows[0];
        const isValid = await bcrypt.compare(credentials!.password.trim(), user.password_hash);
        if (!isValid) {
          throw new Error("Invalid username or password");
        }

        // Return user data (exclude sensitive fields as needed)
        return { id: user.id, name: user.username, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID and other relevant fields to the session object
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as number,
          name: token.name as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },  
  pages: {
    signIn: "/login", // Use our custom login page
  },
});

export { handler as GET, handler as POST };
