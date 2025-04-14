// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  // Query the database for the latest user data.
  const [rows]: any = await db.query(
    "SELECT id, username as name, email FROM users WHERE id = ?",
    [session.user.id]
  );
  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const userData = rows[0];
  return NextResponse.json(userData);
}
