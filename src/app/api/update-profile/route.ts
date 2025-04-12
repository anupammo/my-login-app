// src/app/api/update-profile/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // IMPORTANT: In a production app, you would extract the user identifier (e.g. from a session or token)
    // For this demo, we're using a fixed username. Change this to match your logged-in user or session.
    const username = "john_doe";
    
    console.log("Received update request for user:", username);
    console.log("New email:", email);

    // Run the update query
    const [result]: any = await db.query(
      "UPDATE users SET email = ? WHERE username = ?",
      [email.trim(), username]
    );

    console.log("Update query result:", result);

    if (result.affectedRows === 0) {
      // Log error for debugging
      console.error("No rows affected. The username might not exist or the email might be unchanged.");
      return NextResponse.json(
        { error: "User not found or profile not updated." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
