"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  demoVerificationCode,
  useAuth,
} from "@/components/AuthProvider";

export default function VerifyPage() {
  const router = useRouter();
  const { hydrated, identifier, stage, verifyCode, login } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const maskedIdentifier = useMemo(() => {
    if (!identifier) return "your inbox";
    if (identifier.includes("@")) {
      const [name, domain] = identifier.split("@");
      return `${name.slice(0, 2)}•••@${domain}`;
    }
    return `${identifier.slice(0, 3)}•••${identifier.slice(-2)}`;
  }, [identifier]);

  if (hydrated && stage === "logged-out") {
    router.replace("/login");
  }

  if (hydrated && stage === "verified") {
    router.replace("/home");
  }

  const handleVerify = () => {
    const valid = verifyCode(code);
    if (!valid) {
      setError("That code does not match the demo code yet.");
      return;
    }
    setError("");
    router.push("/home");
  };

  return (
    <main className="min-h-screen px-5 pb-10 pt-8">
      <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted">
        <ChevronLeft size={16} />
        Back
      </Link>

      <section className="mt-10 rounded-[32px] border border-border bg-surface px-5 py-6 shadow-card">
        <p className="text-[11px] uppercase tracking-[0.18em] text-accent">Verification</p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-ink">
          Enter the code we sent.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We sent a demo code to {maskedIdentifier}. Use{" "}
          <span className="font-medium text-ink">{demoVerificationCode}</span> to continue.
        </p>

        <label className="mt-6 block text-xs uppercase tracking-[0.16em] text-muted">
          4-digit code
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={code}
          onChange={(event) => {
            setCode(event.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder="2419"
          className="mt-2 w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm tracking-[0.32em] text-ink outline-none placeholder:text-muted"
        />

        {error ? <p className="mt-3 text-sm text-[#B75D43]">{error}</p> : null}

        <button
          type="button"
          onClick={handleVerify}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.99]"
        >
          Verify and enter Talosly
        </button>

        <button
          type="button"
          onClick={() => login(identifier || "maya@talosly.com")}
          className="mt-4 w-full text-center text-sm text-accent"
        >
          Resend demo code
        </button>
      </section>
    </main>
  );
}
