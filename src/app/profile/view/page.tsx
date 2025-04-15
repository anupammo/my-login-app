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
            <div className="col-md-4 col-12"></div>
            <div className="col-md-4 col-12">
              <div className="card border-0 my-20">
                <div className="card-body">
                  <h3 className="text-center">
                    <span className="lead">Welcome, </span>
                    <span className="d-block text-uppercase text-success fs-3"> {profile.name}</span>
                  </h3>
                  <img className='img-fluid rounded-circle d-block mx-auto my-3' src="../img/login-now.png" width={200} alt="" />
                  <p className="text-center">
                    <strong>Email —</strong> {profile.email}
                  </p>
                  <div className="text-center">
                    <Link href="/profile/edit">
                      <button className="btn btn-outline-primary rounded-pill px-3 me-2">Edit Profile</button>
                    </Link>
                    {/* Include Logout Button */}
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
