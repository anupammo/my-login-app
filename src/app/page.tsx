// src/app/page.tsx (Home Page)
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to the Login App</h1>
      <p>Access your profile or sign up for a new account.</p>
      <div>
        <Link href="/login">
          <button className="btn btn-primary m-2">Login</button>
        </Link>
        <Link href="/signup">
          <button className="btn btn-success m-2">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
