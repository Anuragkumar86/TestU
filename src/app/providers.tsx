// src/app/providers.tsx

"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}