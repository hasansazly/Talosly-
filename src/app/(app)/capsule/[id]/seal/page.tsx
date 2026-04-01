"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { mockCapsules } from "@/lib/mock-data";

export default function SealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const capsule = mockCapsules.find((c) => c.id === id);

  if (!capsule) notFound();

  const [visibleAvatars, setVisibleAvatars] = useState(0);
  const [showSeal, setShowSeal] = useState(false);
  const [sealing, setSealing] = useState(false);
  const [sealed, setSealed] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleAvatars((prev) => {
        if (prev >= capsule.contributions.length) {
          window.clearInterval(timer);
          window.setTimeout(() => setShowSeal(true), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => window.clearInterval(timer);
  }, [capsule.contributions.length]);

  const handleSeal = () => {
    setSealing(true);
    window.setTimeout(() => {
      setSealing(false);
      setSealed(true);
    }, 2000);
  };

  if (sealed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-plum/60 animate-[scale-in_0.4s_ease-out]">
          <Lock size={36} className="text-accent" />
        </div>
        <p className="mb-2 font-serif text-2xl italic text-ink">Sealed.</p>
        <p className="mb-2 text-sm leading-relaxed text-muted">
          {capsule.contributions.length} contributions locked inside.
        </p>
        <p className="mb-8 text-sm font-medium text-accent">
          {capsule.triggerType === "date" && capsule.unlockDate
            ? `Opens ${new Date(capsule.unlockDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`
            : capsule.triggerLabel}
        </p>
        <p className="mb-8 max-w-[260px] text-xs leading-relaxed text-muted/50">
          Everyone in the circle has been notified. They&apos;ll get a reminder 30 days and 7 days before it opens.
        </p>
        <button
          onClick={() => router.push("/upcoming")}
          className="rounded-2xl bg-accent px-8 py-3.5 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="mb-2 font-serif text-2xl italic text-ink">
        {sealing ? "Sealing..." : "Ready to seal?"}
      </p>
      <p className="mb-10 text-sm text-muted">{capsule.name}</p>

      <div className="mb-4 flex flex-wrap justify-center gap-3">
        {capsule.contributions.map((contribution, i) => (
          <div
            key={contribution.id}
            className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${
              i < visibleAvatars ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/30 bg-accent text-sm font-medium text-bg">
              {contribution.author.initials}
            </div>
            <span className="text-[10px] text-muted">{contribution.author.name}</span>
            <div className="flex gap-0.5">
              <div className="h-1 w-1 rounded-full bg-accent/40" />
            </div>
          </div>
        ))}
      </div>

      {visibleAvatars >= capsule.contributions.length ? (
        <div className="mb-10 mt-2 flex justify-center gap-4 animate-[fade-in_0.4s_ease-out]">
          <div className="text-center">
            <p className="text-xl font-medium text-ink">
              {capsule.contributions.filter((c) => c.type === "text").length}
            </p>
            <p className="text-xs text-muted">notes</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-xl font-medium text-ink">
              {capsule.contributions.filter((c) => c.type === "photo").length}
            </p>
            <p className="text-xs text-muted">photos</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-xl font-medium text-ink">
              {capsule.triggerType === "date" ? `${capsule.daysUntilUnlock ?? "—"}d` : "—"}
            </p>
            <p className="text-xs text-muted">until open</p>
          </div>
        </div>
      ) : null}

      {showSeal && !sealing ? (
        <button
          onClick={handleSeal}
          className="rounded-2xl bg-accent px-10 py-4 text-base font-medium text-bg shadow-lg shadow-accent/20 transition-transform active:scale-[0.98]"
        >
          Seal the capsule
        </button>
      ) : null}

      {sealing ? (
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
          <p className="text-sm text-muted">Locking everything inside...</p>
        </div>
      ) : null}
    </div>
  );
}
