"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

const features = [
  {
    title: "Small, warm check-ins",
    body: "Not a feed for everyone. Just the people you want to stay close to.",
  },
  {
    title: "Memories that feel lived in",
    body: "Photos, notes, and quiet moments kept together in one place.",
  },
  {
    title: "Upcoming reasons to gather",
    body: "A simple way to keep birthdays, visits, and reunions from slipping away.",
  },
];

export default function RootPage() {
  const router = useRouter();
  const { hydrated, stage } = useAuth();

  useEffect(() => {
    if (hydrated && stage === "verified") {
      router.replace("/home");
    }
  }, [hydrated, router, stage]);

  return (
    <main className="min-h-screen overflow-hidden px-5 pb-10 pt-7">
      <header className="flex items-center justify-between">
        <div>
          <div className="font-serif text-2xl italic text-ink">talosly</div>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-accent">
            Stay close to who matters
          </p>
        </div>
        <Link
          href="/login"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink shadow-card"
        >
          Log in
        </Link>
      </header>

      <section className="relative mt-12 rounded-[36px] border border-border bg-surface/80 px-5 pb-6 pt-7 shadow-card">
        <div className="pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full bg-[#F0C4B4]/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-12 h-28 w-28 rounded-full bg-[#C8DCC4]/70 blur-3xl" />

        <p className="relative text-[11px] uppercase tracking-[0.18em] text-accent">
          Private social space
        </p>
        <h1 className="relative mt-4 font-serif text-[2.5rem] leading-[1.04] text-ink">
          Stay close,
          <br />
          even when life
          <br />
          gets full.
        </h1>
        <p className="relative mt-4 max-w-[19rem] text-sm leading-7 text-muted">
          Talosly helps small circles share quiet check-ins, hold onto memories,
          and plan the next time they&apos;re together.
        </p>

        <div className="relative mt-6 flex gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg"
          >
            Start demo
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-5 py-3 text-sm text-ink"
          >
            Demo code
            <ShieldCheck size={16} />
          </Link>
        </div>

        <div className="relative mt-7 rounded-[28px] border border-border bg-bg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-serif text-lg italic text-ink">talosly</div>
              <p className="mt-1 text-xs text-muted">Chicago crew · 5 close people</p>
            </div>
            <div className="rounded-full bg-[#E8C49A] px-3 py-1 text-xs text-ink">
              2h ago
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-surface p-3 shadow-card">
              <p className="text-xs text-muted">Maya · just now</p>
              <p className="mt-1 text-sm leading-6 text-ink">
                Finally made it through the week. Miss you all.
              </p>
            </div>
            <div className="rounded-2xl bg-[#F6E8D8] p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-accent">Memory</p>
              <p className="mt-1 font-serif text-sm italic leading-6 text-ink">
                That rooftop plan was the best bad idea we ever had.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[28px] border border-border bg-surface/85 px-4 py-4 shadow-card"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-accent" />
              <p className="font-serif text-lg text-ink">{feature.title}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{feature.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
