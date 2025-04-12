// src/app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching user data after login
    // In a real application, you would fetch user session information from an API or context
    const demoUser = {
      username: 'john_doe',
      email: 'john.doe@example.com',
      createdAt: '2025-04-12',
    };
    setUser(demoUser);
  }, []);

  if (!user) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome, {user.username}</h5>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="card-text">
            <strong>Account Created:</strong> {user.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
}
