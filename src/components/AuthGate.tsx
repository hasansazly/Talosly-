"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export function AuthGate({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { hydrated, stage } = useAuth();

  useEffect(() => {
    if (!hydrated) return;
    if (stage !== "verified") {
      router.replace("/");
    }
  }, [hydrated, router, stage]);

  if (!hydrated || stage !== "verified") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center text-sm text-muted">
        Opening Talosly...
      </div>
    );
  }

  return <>{children}</>;
}
