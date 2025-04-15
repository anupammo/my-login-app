// src/app/profile/edit/page.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ShootingStarsBG from "@/components/ShootingStarsBG";

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch the latest profile data from the DB (via an API endpoint)
  const fetchProfileData = async () => {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await res.json();
      setUsername(data.name || "");
      setEmail(data.email || "");
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status !== "loading") {
      // Instead of using the stale session data directly,
      // fetch fresh data from the API.
      fetchProfileData();
    }
  }, [status, router]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      // Update the profile in the database.
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        // Fetch the updated profile data.
        await fetchProfileData();
        // Redirect to the profile view page.
        router.push("/profile/view");
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="bg-image">
      <ShootingStarsBG />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12"></div>
            <div className="col-md-4 col-12">
              <div className="card border-0 my-20">
                <div className="card-body px-5">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="row">
                    <div className="col">
                      <h1 className="lead fs-4">Welcome, 
                        <span className="text-uppercase text-success"> {username}</span>
                      </h1>
                      <p className="lead fs-6">You can update your Profile</p>
                    </div>
                    <div className="col">
                      <img className='img-fluid rounded-circle d-block mx-auto' src="../img/login-now.png" width={120} alt="" />
                    </div>
                  </div>                  
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
                        placeholder="Enter your new email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-outline-success rounded-pill px-3 me-2">Update Now</button>
                      <Link href="/profile/view">
                        <button type="submit" className="btn btn-outline-primary rounded-pill px-3">View Profile</button>
                      </Link>
                    </div>
                  </form>
                  <p className="text-center mt-3">
                    <small className="text-muted">
                      Ensure your details are accurate.
                    </small>
                  </p>
                </div>
              </div>
            <div className="col-md-4 col-12"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
