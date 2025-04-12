// src/app/profile/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if the user is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="container mt-5">Loading...</div>;
  }
  if (!session || !session.user) {
    return <div className="container mt-5">No user data found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>User Profile</h3>
        </div>
        <div className="card-body">
          <h4>Welcome, {session.user.name}</h4>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
        </div>
        <div className="card-footer text-center">
          <Link href="/profile/edit">
            <button className="btn btn-secondary">Edit Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
