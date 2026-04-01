"use client";

import { useState } from "react";
import { Bell, ChevronRight, FileText, Lock, Mic, Plus } from "lucide-react";
import { clsx } from "clsx";
import { TopBar } from "@/components/TopBar";
import { mockCapsules, mockEvents } from "@/lib/mock-data";

export default function UpcomingPage() {
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [capsuleMode, setCapsuleMode] = useState<"letter" | "voice">("letter");
  const [triggerType, setTriggerType] = useState<"date" | "event">("date");
  const [triggerDate, setTriggerDate] = useState("");
  const [triggerLabel, setTriggerLabel] = useState("");

  const handleSave = () => {
    setTitle("");
    setDate("");
    setIsEventOpen(false);
  };

  const handleSeal = () => {
    setCapsuleMode("letter");
    setTriggerType("date");
    setTriggerDate("");
    setTriggerLabel("");
    setIsCapsuleOpen(false);
  };

  return (
    <div className="pb-28">
      <TopBar />

      <section className="mx-4 mb-4 mt-[72px] rounded-2xl border border-accent/20 bg-plum/30 p-4">
        <Bell size={16} className="text-accent" />
        <p className="mt-3 text-sm leading-relaxed text-ink/80">
          It&apos;s been 4 months since you&apos;ve seen Priya.
        </p>
        <button type="button" className="mt-2 block text-sm font-medium text-accent">
          Plan something →
        </button>
      </section>

      <section className="overflow-hidden rounded-t-3xl border-t border-border bg-surface/40">
        {mockEvents.map((event) => (
          <article
            key={event.id}
            className="flex items-center gap-4 border-b border-border px-4 py-4"
          >
            <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl border border-accent/20 bg-plum/40">
              <span className="text-[9px] uppercase tracking-widest text-accent/60">
                {event.month}
              </span>
              <span className="text-lg font-semibold leading-none text-accent">
                {event.day}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">{event.title}</p>
              <p className="mt-0.5 text-xs text-muted">
                In {event.daysUntil} days · {event.going} going
              </p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </article>
        ))}
      </section>

      <section className="mb-2 mt-6 flex items-center justify-between px-4">
        <p className="text-sm font-medium text-ink">Time capsules</p>
        <button
          type="button"
          onClick={() => setIsCapsuleOpen(true)}
          className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-muted transition-transform active:scale-95"
        >
          + New
        </button>
      </section>

      <section>
        {mockCapsules.map((capsule) => {
          const progress = `${Math.max(6, Math.min(100, 100 - (capsule.daysUntil / 183) * 100))}%`;
          return (
            <article
              key={capsule.id}
              className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="flex items-start gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-plum/40">
                  <Lock size={16} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{capsule.trigger}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    From {capsule.from.name} · Opens in {capsule.daysUntil} days
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{capsule.preview}</p>
                </div>
                <span className="rounded-full bg-plum/30 px-2 py-0.5 text-[10px] text-accent/80">
                  {capsule.daysUntil}d
                </span>
              </div>
              <div className="h-0.5 w-full bg-border">
                <div className="h-full bg-accent/50" style={{ width: progress }} />
              </div>
            </article>
          );
        })}
      </section>

      <button
        type="button"
        onClick={() => setIsEventOpen(true)}
        aria-label="Add event"
        className="fixed bottom-20 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-accent/25 transition-transform active:scale-95"
      >
        <Plus size={24} />
      </button>

      <div
        className={clsx(
          "fixed inset-0 z-30 transition-opacity duration-300",
          isEventOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Close add event sheet"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsEventOpen(false)}
        />
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 mx-auto max-w-[430px] rounded-t-3xl bg-surface2 px-5 pb-8 pt-3 transition-transform duration-300",
            isEventOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />
          <p className="mb-3 text-xs text-muted">Add something worth gathering for</p>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Event title"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
          />
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none [color-scheme:dark]"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-transform active:scale-95"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-30 transition-opacity duration-300",
          isCapsuleOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Close capsule sheet"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsCapsuleOpen(false)}
        />
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 mx-auto max-w-[430px] rounded-t-3xl bg-surface2 px-5 pb-8 pt-3 transition-transform duration-300",
            isCapsuleOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />
          <p className="font-serif text-base italic text-ink">Seal something away</p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => setCapsuleMode("letter")}
              className={clsx(
                "flex items-center gap-3 rounded-2xl border p-4 text-left",
                capsuleMode === "letter" ? "border-accent bg-plum/20" : "border-border bg-surface2",
              )}
            >
              <FileText size={18} className="text-accent" />
              <div>
                <p className="text-sm font-medium text-ink">Write a letter</p>
                <p className="text-xs text-muted">Seal a note for later</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setCapsuleMode("voice")}
              className={clsx(
                "flex items-center gap-3 rounded-2xl border p-4 text-left",
                capsuleMode === "voice" ? "border-accent bg-plum/20" : "border-border bg-surface2",
              )}
            >
              <Mic size={18} className="text-accent" />
              <div>
                <p className="text-sm font-medium text-ink">Record a voice memo</p>
                <p className="text-xs text-muted">Coming soon</p>
              </div>
            </button>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setTriggerType("date")}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-sm",
                triggerType === "date"
                  ? "border-accent bg-plum text-accent"
                  : "border-border bg-surface2 text-muted",
              )}
            >
              On a date
            </button>
            <button
              type="button"
              onClick={() => setTriggerType("event")}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-sm",
                triggerType === "event"
                  ? "border-accent bg-plum text-accent"
                  : "border-border bg-surface2 text-muted",
              )}
            >
              When something happens
            </button>
          </div>

          {triggerType === "date" ? (
            <input
              type="date"
              value={triggerDate}
              onChange={(event) => setTriggerDate(event.target.value)}
              className="mt-4 w-full rounded-xl border border-border bg-surface2 px-4 py-3 text-ink outline-none [color-scheme:dark]"
            />
          ) : (
            <input
              type="text"
              value={triggerLabel}
              onChange={(event) => setTriggerLabel(event.target.value)}
              placeholder="e.g. When Jamie visits Chicago"
              className="mt-4 w-full rounded-xl border border-border bg-surface2 px-4 py-3 text-ink outline-none placeholder:text-muted"
            />
          )}

          <button
            type="button"
            onClick={handleSeal}
            className="mt-4 w-full rounded-full bg-accent py-3 text-center text-sm font-medium text-bg"
          >
            Seal capsule
          </button>
        </div>
      </div>
    </div>
  );
}
