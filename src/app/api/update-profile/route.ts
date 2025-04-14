// src/app/api/update-profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { email } = await request.json();
  const userId = session.user.id;

  try {
    const [result]: any = await db.query(
      "UPDATE users SET email = ? WHERE id = ?",
      [email.trim(), userId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "User not found or profile not updated." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
