import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if the username or email already exists
    const [existingUser]: any = await db.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username.trim(), email.trim()]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Username or email already in use." },
        { status: 409 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.trim(), saltRounds);

    // Insert the new user into the database
    const [result]: any = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username.trim(), email.trim(), hashedPassword]
    );

    if (result.affectedRows === 1) {
      return NextResponse.json({ message: "Account created successfully!" });
    } else {
      return NextResponse.json(
        { error: "Failed to create account." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
