'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Account created successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000); // Redirect to login page after 2 seconds
      } else {
        setErrorMsg(data.error || "Failed to create account.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-success text-white text-center">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="alert alert-success" role="alert">
                  {successMsg}
                </div>
              )}
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Login here
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
