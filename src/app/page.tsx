"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const floatingPeople = [
  { initials: "M", label: "Maya · Chicago", tone: "bg-success/20 text-success", pos: "left-[6%] top-[22%]" },
  { initials: "J", label: "Jamie · Austin", tone: "bg-accent-dim/25 text-accent", pos: "right-[7%] top-[29%]" },
  { initials: "P", label: "Priya · NYC", tone: "bg-accent/20 text-accent", pos: "left-[10%] bottom-[24%]" },
  { initials: "R", label: "Ryan · London", tone: "bg-surface2 text-ink/80", pos: "right-[8%] bottom-[28%]" },
  { initials: "D", label: "Dev · Boston", tone: "bg-success/20 text-success", pos: "right-[22%] top-[12%]" },
];

const features = [
  {
    icon: "🌿",
    title: "Daily check-ins",
    body: "A soft, optional prompt each day. Not a post, not a story, just a note to the people who know you.",
    tone: "bg-success/20",
  },
  {
    icon: "📖",
    title: "Shared memory layer",
    body: "A living scrapbook your whole circle adds to. Moments, photos, inside jokes, and the things that make a friendship real.",
    tone: "bg-accent/20",
  },
  {
    icon: "🗓",
    title: "Upcoming together",
    body: "Anniversaries, visits, trips, and gentle nudges before connections fade: it's been 4 months since you saw Priya.",
    tone: "bg-accent-dim/20",
  },
  {
    icon: "🔒",
    title: "Private by design",
    body: "No public profiles. No social graph. No strangers. Your circle stays yours.",
    tone: "bg-success/20",
  },
];

const personas = [
  {
    initials: "M",
    name: "Maya, 28",
    role: "The Connector · Chicago",
    quote:
      "I'm the one who keeps our friendships alive. I need somewhere that makes it feel less like a job.",
    tags: ["long-distance friends", "post-college circle"],
    tone: "bg-success/20 text-success",
  },
  {
    initials: "S",
    name: "The Silva siblings",
    role: "Three adults · three cities",
    quote:
      "Mom's getting older. We need a space that's ours, not the family group chat with 22 people in it.",
    tags: ["family logistics", "siblings", "caregiving"],
    tone: "bg-surface2 text-ink/80",
  },
  {
    initials: "J",
    name: "Jordan & Riley",
    role: "Couple + shared friend group",
    quote:
      "We want one place for couple stuff and our people. Stop switching apps.",
    tags: ["couples", "shared circle"],
    tone: "bg-accent/20 text-accent",
  },
  {
    initials: "D",
    name: "Diane, 52",
    role: "Caregiver · Boston",
    quote:
      "Coordinating around my dad with my kids is a mess. I just want one quiet place we all actually use.",
    tags: ["caregiving", "family coordination"],
    tone: "bg-surface2 text-ink/80",
  },
];

const steps = [
  {
    num: "01",
    icon: "🌿",
    title: "Create your circle",
    body: "Invite up to 8 people. Name it, add a photo, and write one shared memory to start.",
    tone: "bg-success/20",
  },
  {
    num: "02",
    icon: "✏️",
    title: "Check in daily",
    body: "A gentle prompt, optional always. One thought, one photo, only for the people who know you.",
    tone: "bg-accent-dim/20",
  },
  {
    num: "03",
    icon: "📖",
    title: "Build memories",
    body: "Add moments your whole circle can see and add to. A living record of what you actually share.",
    tone: "bg-accent/20",
  },
  {
    num: "04",
    icon: "🗓",
    title: "Plan and stay close",
    body: "Talosly notices when connections are fading and nudges you toward the next real moment together.",
    tone: "bg-surface2",
  },
];

export default function RootPage() {
  const router = useRouter();
  const { hydrated, stage } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState(
    "No spam. No social network. Just a quiet heads-up when we're ready.",
  );

  useEffect(() => {
    if (hydrated && stage === "verified") {
      router.replace("/home");
    }
  }, [hydrated, router, stage]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWaitlist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = email.split("@")[0]?.trim() || "friend";
    setNote(`You’re on the list, ${name}. We’ll be in touch.`);
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header
        className={`fixed left-0 right-0 top-0 z-40 mx-auto flex max-w-[430px] items-center justify-between px-5 py-4 transition-all ${
          isScrolled
            ? "border-b border-border bg-bg/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="font-serif text-[22px] font-medium tracking-[-0.02em] text-ink">
          talos<span className="italic text-accent">ly</span>
        </Link>
        <div className="flex items-center gap-2">
          <a href="#product" className="text-[12px] text-muted">
            Product
          </a>
          <Link
            href="/login"
            className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-bg"
          >
            Get access
          </Link>
        </div>
      </header>

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-16 h-72 w-72 rounded-full bg-accent-dim/20 blur-[80px] animate-float-soft" />
          <div className="absolute -right-20 top-[24%] h-64 w-64 rounded-full bg-accent/20 blur-[80px] animate-float-soft-delayed" />
          <div className="absolute bottom-0 left-[30%] h-56 w-56 rounded-full bg-success/20 blur-[80px] animate-float-soft-slow" />
        </div>

        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          {floatingPeople.map((person) => (
            <div
              key={person.label}
              className={`absolute ${person.pos} flex flex-col items-center gap-1.5 animate-float-avatar`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/10 text-[22px] font-serif font-medium shadow-card ${person.tone}`}
              >
                {person.initials}
              </div>
              <span className="whitespace-nowrap text-[11px] text-muted">{person.label}</span>
            </div>
          ))}
        </div>

        <p className="animate-rise text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
          Private · Intimate · Yours
        </p>
        <h1 className="animate-rise-delayed mt-6 font-serif text-[42px] leading-[1.08] tracking-[-0.03em] text-ink">
          A home for the people
          <br />
          <em className="italic text-accent">you actually love</em>
        </h1>
        <p className="animate-rise-delayed-2 mt-6 max-w-[21rem] text-[16px] font-light leading-[1.7] text-muted">
          Talosly is a private space for your closest circle. Check in, remember
          together, and stay genuinely close.
        </p>
        <div className="animate-rise-delayed-3 mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-bg shadow-card"
          >
            Request early access
          </Link>
          <a href="#product" className="inline-flex items-center gap-1 text-[15px] text-muted">
            See how it works <span className="transition-transform">→</span>
          </a>
        </div>

        <div className="animate-rise-delayed-3 mt-14 w-full max-w-[320px] rounded-[32px] border border-white/10 bg-surface/80 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="rounded-[26px] bg-bg p-3">
            <div className="border-b border-border px-2 pb-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-[17px] italic text-ink">talosly</span>
                <div className="flex -space-x-1.5">
                  {["M", "J", "P", "+2"].map((item, index) => (
                    <div
                      key={item}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg text-[11px] font-medium ${
                        index === 0
                          ? "bg-success/20 text-success"
                          : index === 1
                            ? "bg-accent-dim/20 text-accent"
                            : index === 2
                              ? "bg-accent/20 text-accent"
                              : "bg-surface2 text-ink/80"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-left text-[13px] font-medium text-ink">The Chicago crew</p>
              <p className="mt-1 text-left text-[11px] font-light text-muted">
                5 people · last check-in 2h ago
              </p>
            </div>

            <div className="space-y-2.5 px-1 pb-1 pt-3 text-left">
              <div className="rounded-2xl bg-surface p-3 shadow-card">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-[10px] font-medium text-success">
                    M
                  </div>
                  <span className="text-[12px] font-medium text-ink">Maya</span>
                  <span className="ml-auto text-[10px] text-muted">2h ago</span>
                </div>
                <p className="text-[12px] font-light leading-[1.5] text-muted">
                  Finally made it through the week. First time I&apos;ve seen sunshine in four days.
                  Miss you all.
                </p>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded-full bg-surface2 px-2 py-1 text-[11px] text-muted">🤍 3</span>
                  <span className="rounded-full bg-surface2 px-2 py-1 text-[11px] text-muted">💬 reply</span>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-success/20 to-accent/20 p-3">
                <p className="mb-1 text-[10px] uppercase tracking-[0.1em] text-accent/80">
                  Memory · 2 years ago
                </p>
                <p className="font-serif text-[13px] italic leading-[1.4] text-ink">
                  &quot;That rooftop in Wicker Park where we decided to do the road trip. Best bad idea
                  we ever had.&quot;
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-surface p-3 shadow-card">
                <div className="flex h-9 w-9 flex-col items-center justify-center rounded-[10px] bg-accent-dim/20">
                  <span className="text-[8px] uppercase tracking-[0.05em] text-accent">Apr</span>
                  <span className="text-[14px] font-semibold leading-none text-accent">18</span>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-ink">Jamie visits Chicago</p>
                  <p className="mt-0.5 text-[11px] font-light text-muted">In 18 days · 3 going</p>
                </div>
              </div>

              <div className="rounded-2xl bg-surface p-3 shadow-card">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-dim/20 text-[10px] font-medium text-accent">
                    J
                  </div>
                  <span className="text-[12px] font-medium text-ink">Jamie</span>
                  <span className="ml-auto text-[10px] text-muted">5h ago</span>
                </div>
                <p className="text-[12px] font-light leading-[1.5] text-muted">
                  Can&apos;t wait for April. Already planning what we&apos;re eating first.
                </p>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded-full bg-surface2 px-2 py-1 text-[11px] text-muted">🤍 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 animate-rise-delayed-3">
          <div className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.12em] text-muted">scroll</span>
        </div>
      </section>

      <section className="bg-surface px-5 py-20">
        <div className="mx-auto max-w-[360px]">
          <p className="font-serif text-[28px] italic leading-[1.35] text-ink">
            &quot;You still care deeply about them. But somehow <strong className="font-semibold text-accent">life got loud</strong> and the people who matter most became people you <strong className="font-semibold text-accent">mean to call</strong>.&quot;
          </p>
          <p className="mt-8 text-[15px] font-light leading-[1.7] text-muted">
            WhatsApp keeps you in touch. Instagram keeps you performing. Talosly keeps you{" "}
            <em className="text-accent">close</em>.
          </p>
          <div className="mt-10 grid gap-8">
            {[
              ["5–12", "relationships that genuinely matter to most people"],
              ["4mo", "average time between real conversations with close friends"],
              ["0", "apps built specifically to maintain intimacy, not just contact"],
            ].map(([num, label]) => (
              <div key={num}>
                <p className="font-serif text-5xl tracking-[-0.03em] text-accent">{num}</p>
                <p className="mt-2 max-w-[15rem] text-[14px] font-light leading-[1.4] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="px-5 py-20">
        <div className="mx-auto max-w-[360px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            The product
          </p>
          <h2 className="mt-4 font-serif text-[34px] leading-[1.15] tracking-[-0.025em] text-ink">
            Everything your circle needs,
            <br />
            <em className="italic text-accent">nothing it doesn&apos;t</em>
          </h2>

          <div className="mt-10 space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div
                  className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[18px] ${feature.tone}`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-serif text-[17px] font-medium tracking-[-0.015em] text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] font-light leading-[1.65] text-muted">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="personas" className="bg-surface px-5 py-20">
        <div className="mx-auto max-w-[430px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            Who it&apos;s for
          </p>
          <h2 className="mt-4 font-serif text-[34px] leading-[1.15] tracking-[-0.025em] text-ink">
            Every kind of <em className="italic text-accent">close</em>
          </h2>
        </div>
        <div className="-mx-5 mt-10 flex gap-4 overflow-x-auto px-5 pb-1">
          {personas.map((persona) => (
            <article
              key={persona.name}
              className="w-[280px] shrink-0 rounded-3xl border border-border bg-bg p-6 shadow-card"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-serif text-[18px] font-medium ${persona.tone}`}
                >
                  {persona.initials}
                </div>
                <div>
                  <p className="text-[16px] font-medium text-ink">{persona.name}</p>
                  <p className="mt-0.5 text-[12px] font-light text-muted">{persona.role}</p>
                </div>
              </div>
              <p className="mt-4 border-l-2 border-accent/30 pl-3 font-serif text-[14px] italic leading-[1.6] text-muted">
                &quot;{persona.quote}&quot;
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {persona.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-[360px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            How it works
          </p>
          <h2 className="mt-4 font-serif text-[34px] leading-[1.15] tracking-[-0.025em] text-ink">
            Four things, done <em className="italic text-accent">beautifully</em>
          </h2>
          <div className="mt-10 grid gap-8">
            {steps.map((step) => (
              <article key={step.num}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-[22px] ${step.tone}`}>
                  {step.icon}
                </div>
                <p className="mt-4 font-serif text-5xl italic leading-none text-border">{step.num}</p>
                <h3 className="mt-3 font-serif text-[19px] font-medium tracking-[-0.015em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] font-light leading-[1.7] text-muted">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="relative overflow-hidden bg-surface px-5 py-20">
        <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-accent/12 blur-[100px]" />
        <div className="absolute -bottom-16 right-0 h-52 w-52 rounded-full bg-success/12 blur-[100px]" />
        <div className="relative mx-auto max-w-[360px] text-center">
          <h2 className="font-serif text-[38px] leading-[1.1] tracking-[-0.03em] text-ink">
            The people who matter
            <br />
            deserve more than a
            <br />
            <em className="italic text-accent">group chat</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[18rem] text-[17px] font-light leading-[1.6] text-muted">
            Join the waitlist. Early access is invite-only and opens in summer 2025.
          </p>
          <form onSubmit={handleWaitlist} className="mt-8 flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-full border border-border bg-bg px-5 py-3.5 text-[15px] text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium text-bg"
            >
              Join waitlist
            </button>
          </form>
          <p className={`mt-4 text-[12px] font-light ${note.includes("on the list") ? "text-success" : "text-muted"}`}>
            {note}
          </p>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-5 border-t border-border bg-bg px-5 py-10 text-center">
        <Link href="/" className="font-serif text-[18px] italic text-ink/70">
          talosly
        </Link>
        <div className="flex flex-wrap justify-center gap-6 text-[13px] text-muted">
          <a href="#">Privacy</a>
          <a href="#">Values</a>
          <a href="#">Contact</a>
        </div>
        <p className="text-[12px] font-light text-muted/70">© 2025 Talosly</p>
      </footer>
    </main>
  );
}
