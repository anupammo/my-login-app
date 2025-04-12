// src/app/api/profile/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // For demo: assume the logged‑in user is 'john_doe'.
    const username = 'john_doe';
    const [rows]: any = await db.query(
      'SELECT username, email, created_at FROM users WHERE username = ?',
      [username]
    );
    if (!rows.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user: rows[0] });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
