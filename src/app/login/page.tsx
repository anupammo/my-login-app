// src/app/login/page.tsx
'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShootingStarsBG from "@/components/ShootingStarsBG";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username: username.trim(),
      password: password.trim(),
    });

    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      router.push("/profile/view"); // Redirect to the new URL for profile view
    }
  };

  return (
    <div className="bg-image">
      <ShootingStarsBG />
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-12"></div>
          <div className="col-md-6 col-12">
            <div className="card text-white my-20">
              <div className="card-body px-5">
                <div className="row">
                  <div className="col">
                    <h3 className="lead text-white fw-bold fs-3 mt-5">Login now</h3>
                    <hr className="border-2 opacity-100 w-50" />
                    <hr className="border-2 opacity-100 w-25" />
                  </div>
                  <div className="col">
                    <img className='img-fluid rounded-circle d-block mx-auto my-3' src="./img/login-now.png" width={150} alt="" />
                  </div>
                </div>
                {errorMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control shadow-none bg-transparent text-white border-bottom border-0 rounded-0 px-0"
                          id="username"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control shadow-none bg-transparent text-white border-bottom border-0 rounded-0 px-0"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-center my-4">
                    <button type="submit" className="btn btn-light shadow-none rounded-0 px-5 me-4">Login</button>
                    <Link href='/'>
                      <button className="btn btn-outline-light shadow-none rounded-0 px-5">Home</button>
                    </Link>
                  </p>
                </form>
                <p className="text-center mt-3">
                  Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12"></div>
        </div>
      </div>
    </div>
  );
}
