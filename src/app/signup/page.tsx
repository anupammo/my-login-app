// src/app/signup/page.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShootingStarsBG from "@/components/ShootingStarsBG";

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
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setErrorMsg(data.error || "Failed to create account.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMsg("Something went wrong. Please try again.");
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
                <div className="card-body px-5">
                  <div className="row">
                    <div className="col">
                      <h3 className="lead fw-bold fs-1 mt-5">Signup</h3>
                      <hr className="border-white border-2 opacity-100 w-50" />
                      <hr className="border-white border-2 opacity-100 w-25" />
                    </div>
                    <div className="col">
                      <img className='img-fluid rounded-circle d-block mx-auto my-3' src="./img/signup-now.png" width={150} alt="Signup Image" />
                    </div>
                  </div>
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
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control bg-transparent text-white shadow-none border-bottom border-0 rounded-0 px-0"
                            id="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control bg-transparent text-white shadow-none border-bottom border-0 rounded-0 px-0"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control bg-transparent text-white shadow-none border-bottom border-0 rounded-0 px-0"
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col pt-2">
                        <button type="submit" className="btn btn-outline-light shadow-none rounded-0 w-100 mt-4">Sign Up</button>
                      </div>
                    </div>
                  </form>
                  <p className="text-center mt-3">
                    Already have an account? <a href="/login" className="text-decoration-none">Login here</a>
                  </p>
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
