import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, newPassword } = body;

    if (!username || !newPassword) {
      return NextResponse.json(
        { error: 'Username and new password are required.' },
        { status: 400 }
      );
    }

    // Generate a new bcrypt hash for the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword.trim(), saltRounds);

    // Update the user's password in the database
    const [result]: any = await db.query(
      'UPDATE users SET password_hash = ? WHERE username = ?',
      [hashedPassword, username.trim()]
    );

    // Check if the update affected any rows; if not, then user might not exist.
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
