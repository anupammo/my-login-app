// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Query the database for the user by username
    const [rows]: any = await db.query('SELECT * FROM users WHERE username = ?', [username.trim()]);
    if (!rows.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Optionally, remove password_hash from the response before sending user info
    delete user.password_hash;

    return NextResponse.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
