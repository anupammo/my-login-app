// src/app/profile/view/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ShootingStarsBG from "@/components/ShootingStarsBG";
import LogoutButton from "@/components/LogoutButton";

export default function ProfileViewPage() {
  const [profile, setProfile] = useState<{ id: number; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="container mt-5 text-center">
        <p>No profile data available.</p>
        <Link href="/login">
          <button className="btn btn-primary">Go to Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-image">
      <ShootingStarsBG />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12"></div>
            <div className="col-md-6 col-12">
              <div className="card text-white my-20">
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col">
                      <h3 className="mt-3">
                        <span className="lead">Welcome, </span>
                        <span className="d-block text-uppercase fs-3"> {profile.name}</span>
                      </h3>
                      <hr className="border-white border-2 opacity-100 w-50" />
                      <hr className="border-white border-2 opacity-100 w-25" />
                      <hr className="border-white border-2 opacity-100 w-50" />
                      <p className="">
                        <strong>Email :</strong> 
                        <span className="lead d-block fs-6"> {profile.email}</span>
                      </p>
                    </div>
                    <div className="col">
                      <img className='img-fluid d-block mx-auto my-3' src="../img/user-image.png" width={200} alt="User Image" />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <Link href="/profile/edit">
                      <button className="btn btn-light shadow-none rounded-0 px-3 me-4">Edit Profile</button>
                    </Link>
                    {/* Include Logout Button */}
                    <LogoutButton />
                  </div>
                  <p className="text-center mt-3">
                    Forget you password? <a href="/reset-password" className="text-decoration-none">Reset now</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-12"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
