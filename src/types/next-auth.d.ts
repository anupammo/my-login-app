// src/types/next-auth.d.ts
import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: number;
      name: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    name: string;
    email: string;
  }
}
