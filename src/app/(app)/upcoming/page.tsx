"use client";

import { useState } from "react";
import { Bell, ChevronRight, Plus } from "lucide-react";
import { clsx } from "clsx";
import { TopBar } from "@/components/TopBar";
import { mockEvents } from "@/lib/mock-data";

export default function UpcomingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    setTitle("");
    setDate("");
    setIsOpen(false);
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

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Add event"
        className="fixed bottom-20 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-accent/25 transition-transform active:scale-95"
      >
        <Plus size={24} />
      </button>

      <div
        className={clsx(
          "fixed inset-0 z-30 transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Close add event sheet"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 mx-auto max-w-[430px] rounded-t-3xl bg-surface2 px-5 pb-8 pt-3 transition-transform duration-300",
            isOpen ? "translate-y-0" : "translate-y-full",
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
    </div>
  );
}
