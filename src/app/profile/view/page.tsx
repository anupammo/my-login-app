// src/app/profile/view/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>User Profile</h3>
        </div>
        <div className="card-body">
          <h4>Welcome, {profile.name}</h4>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          {/* Include Logout Button */}
          <LogoutButton />
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
