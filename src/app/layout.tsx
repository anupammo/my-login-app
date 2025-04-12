// src/app/layout.tsx
'use client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { SessionProvider } from 'next-auth/react';
// import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
