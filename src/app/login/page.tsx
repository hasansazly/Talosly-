"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login, stage } = useAuth();
  const [identifier, setIdentifier] = useState("");

  const handleContinue = () => {
    const value = identifier.trim();
    if (!value) return;
    login(value);
    router.push("/verify");
  };

  if (stage === "verified") {
    router.replace("/home");
  }

  return (
    <main className="min-h-screen px-5 pb-10 pt-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted">
        <ChevronLeft size={16} />
        Back
      </Link>

      <section className="mt-10 rounded-[32px] border border-border bg-surface px-5 py-6 shadow-card">
        <p className="text-[11px] uppercase tracking-[0.18em] text-accent">Welcome back</p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-ink">
          Sign in to your circle.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This is a frontend demo, so any email or phone number works.
        </p>

        <label className="mt-6 block text-xs uppercase tracking-[0.16em] text-muted">
          Email or phone
        </label>
        <input
          type="text"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="maya@talosly.com"
          className="mt-2 w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
        />

        <button
          type="button"
          onClick={handleContinue}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.99]"
        >
          Send verification code
          <ArrowRight size={16} />
        </button>

        <p className="mt-4 text-center text-xs text-muted">
          Demo flow only. Real auth can replace this later.
        </p>
      </section>
    </main>
  );
}
