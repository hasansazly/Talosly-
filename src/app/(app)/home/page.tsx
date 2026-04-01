"use client";

import { useMemo, useState } from "react";
import { ImageIcon, Plus, SendHorizonal } from "lucide-react";
import { clsx } from "clsx";
import { Avatar } from "@/components/Avatar";
import { TopBar } from "@/components/TopBar";
import { mockCheckins, mockCircles, mockUser } from "@/lib/mock-data";

type Checkin = (typeof mockCheckins)[number];

export default function HomePage() {
  const [activeCircle, setActiveCircle] = useState(mockCircles[0].id);
  const [checkins, setCheckins] = useState<Checkin[]>(mockCheckins);
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const activeCircleData = useMemo(
    () => mockCircles.find((circle) => circle.id === activeCircle) ?? mockCircles[0],
    [activeCircle],
  );

  const toggleReaction = (checkinId: string, emoji: string) => {
    setCheckins((current) =>
      current.map((checkin) => {
        if (checkin.id !== checkinId) return checkin;

        return {
          ...checkin,
          reactions: checkin.reactions.map((reaction) => {
            if (reaction.emoji !== emoji) return reaction;

            const reacted = !reaction.reacted;
            return {
              ...reaction,
              reacted,
              count: Math.max(0, reaction.count + (reacted ? 1 : -1)),
            };
          }),
        };
      }),
    );
  };

  const handleSend = () => {
    const body = draft.trim();
    if (!body) return;

    setCheckins((current) => [
      {
        id: `ci-${Date.now()}`,
        author: {
          id: mockUser.id,
          name: mockUser.name,
          initials: mockUser.initials,
          color: mockUser.avatarColor,
        },
        body,
        timestamp: "just now",
        reactions: [{ emoji: "🤍", count: 0, reacted: false }],
        unread: true,
      },
      ...current,
    ]);
    setDraft("");
    setIsOpen(false);
  };

  return (
    <div className="pb-28">
      <TopBar />

      <section className="mt-14 px-4 pt-3">
        <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2">
          {mockCircles.map((circle) => {
            const isActive = circle.id === activeCircle;
            return (
              <button
                key={circle.id}
                type="button"
                onClick={() => setActiveCircle(circle.id)}
                className={clsx(
                  "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-all",
                  isActive
                    ? "border-accent bg-plum text-accent shadow-glow"
                    : "border-border bg-surface text-muted",
                )}
              >
                {circle.name}
              </button>
            );
          })}
        </div>
        <div className="mx-1 mt-3 rounded-2xl border border-border bg-surface/80 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Current circle</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <h1 className="text-lg font-medium text-ink">{activeCircleData.name}</h1>
              <p className="mt-1 text-sm text-muted">
                {activeCircleData.memberCount} close people · last check-in {activeCircleData.lastCheckin}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Tonight</p>
              <p className="mt-1 font-serif text-lg italic text-accent">Stay close</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        {checkins.map((checkin) => (
          <article
            key={checkin.id}
            className={clsx(
              "relative mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-surface p-4",
              checkin.unread && "border-l-2 border-l-accent",
            )}
          >
            {checkin.unread ? (
              <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent animate-pulse" />
            ) : null}

            <div className="flex items-center gap-3">
              <Avatar initials={checkin.author.initials} color={checkin.author.color} size={28} />
              <p className="text-sm font-medium text-ink">{checkin.author.name}</p>
              <p className="ml-auto text-xs text-muted">{checkin.timestamp}</p>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-ink/90">{checkin.body}</p>

            <div className="mt-3 flex gap-2">
              {checkin.reactions.map((reaction) => (
                <button
                  key={`${checkin.id}-${reaction.emoji}`}
                  type="button"
                  onClick={() => toggleReaction(checkin.id, reaction.emoji)}
                  className={clsx(
                    "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors",
                    reaction.reacted
                      ? "border border-accent/30 bg-plum/40 text-accent"
                      : "bg-surface2 text-muted",
                  )}
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </section>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Compose check-in"
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
          aria-label="Close compose sheet"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 mx-auto max-w-[430px] rounded-t-3xl bg-surface2 px-5 pb-8 pt-3 transition-transform duration-300",
            isOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mb-5 h-1 w-10 rounded-full bg-border mx-auto" />
          <p className="mb-2 text-xs text-muted">Checking in to {activeCircleData.name}</p>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="What's one thing from today?"
            className="min-h-[100px] w-full resize-none bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <div className="mt-4 flex items-center justify-between">
            <button type="button" className="text-muted transition-colors active:text-accent">
              <ImageIcon size={20} />
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-transform active:scale-95"
            >
              Send
              <SendHorizonal size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
