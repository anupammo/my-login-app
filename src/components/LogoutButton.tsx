// src/components/LogoutButton.tsx
'use client';

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    // signOut clears the session and redirects the user
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <button className="btn btn-outline-light rounded-0 px-4" onClick={handleLogout}>
      Logout
    </button>
  );
}
