'use client';

import { useState } from 'react';
import Link from "next/link";
// import { useRouter } from "next/navigation";
import ShootingStarsBG from "@/components/ShootingStarsBG";

export default function ResetPasswordPage() {
  const [username, setUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation: ensure both password entries match
    if (newPassword.trim() !== confirmPassword.trim()) {
      setMessage('Passwords do not match.');
      return;
    }
    
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          newPassword: newPassword.trim(),
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Password updated successfully.');
        // Optionally, redirect the user or clear the form
      } else {
        setMessage(data.error || 'Error updating password.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-image">
      <ShootingStarsBG />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card text-white my-20">
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col">
                      <h1 className="lead fs-1 mt-3">Reset Password</h1>
                      <hr className="border-white border-2 opacity-100 w-50" />
                      <hr className="border-white border-2 opacity-100 w-25" />
                    </div>
                    <div className="col">
                      <img className='img-fluid d-block mx-auto my-3' src="../img/user-image.png" width={150} alt="User Image" />
                    </div>
                  </div>                  
                  {message && (
                    <div className="alert alert-info" role="alert">
                      {message}
                    </div>
                  )}
                  <form onSubmit={handleReset}>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            className="form-control bg-transparent text-white shadow-none border-bottom border-0 rounded-0"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="newPassword" className="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="form-control bg-transparent text-white shadow-none border-bottom border-0 rounded-0"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="confirmPassword" className="form-label">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="form-control bg-transparent text-white shadow-none border-bottom border-0 rounded-0"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col pt-2">
                        <div className="mt-4">
                          <button type="submit" className="btn btn-light shadow-none rounded-0 me-2 px-4">Update</button>
                          <Link href='/profile/view'>
                            <button className="btn btn-outline-light shadow-none rounded-0 px-4">Profile</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
