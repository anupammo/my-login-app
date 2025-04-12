// src/app/profile/edit/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState<string>(''); // For display purposes
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session) {
      // Pre-fill the form with session data
      setUsername(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session, status, router]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        // If update succeeds, redirect to profile view page.
        router.push('/profile/view');
      } else {
        // If update fails, remain on the edit page and display the error.
        setError(data.error || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  if (status === 'loading') {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-info text-white text-center">
              <h3>Edit Profile</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    readOnly
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Update Profile
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">Ensure your details are accurate.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
