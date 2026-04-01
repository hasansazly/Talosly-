"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { ImageIcon, Quote, SendHorizonal } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { TopBar } from "@/components/TopBar";
import { mockCanvas, mockUser, mockMembers } from "@/lib/mock-data";

type Contribution = (typeof mockCanvas.contributions)[number];
type ComposerMode = "photo" | "quote";

export default function CanvasPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ComposerMode>("quote");
  const [quote, setQuote] = useState("");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&q=80",
  );
  const [contributions, setContributions] = useState<Contribution[]>(mockCanvas.contributions);

  const currentUserHasContributed = useMemo(
    () => contributions.some((contribution) => contribution.author.id === mockUser.id),
    [contributions],
  );

  const completedMemberIds = new Set(contributions.map((contribution) => contribution.author.id));
  const progressMembers = mockMembers.map((member) => ({
    ...member,
    contributed: completedMemberIds.has(member.id),
  }));

  const handleSubmit = () => {
    if (mode === "quote") {
      const content = quote.trim();
      if (!content) return;

      setContributions((current) => [
        {
          id: `cv-${Date.now()}`,
          author: {
            id: mockUser.id,
            name: mockUser.name,
            initials: mockUser.initials,
            color: mockUser.avatarColor,
          },
          type: "quote",
          content,
          day: "Thu",
        },
        ...current,
      ]);
      setQuote("");
    } else {
      const imageUrl = photoUrl.trim();
      if (!imageUrl) return;

      setContributions((current) => [
        {
          id: `cv-${Date.now()}`,
          author: {
            id: mockUser.id,
            name: mockUser.name,
            initials: mockUser.initials,
            color: mockUser.avatarColor,
          },
          type: "photo",
          imageUrl,
          day: "Thu",
        },
        ...current,
      ]);
    }

    setIsOpen(false);
    setMode("quote");
  };

  return (
    <div className="pb-28">
      <TopBar
        rightSlot={
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">{mockCanvas.weekLabel}</span>
            <span className="rounded-full bg-plum/40 px-2.5 py-1 text-xs text-accent">
              {mockCanvas.endsIn}
            </span>
          </div>
        }
      />

      <section className="mx-4 mb-3 mt-[72px] rounded-2xl border border-border bg-surface p-4">
        <h1 className="font-serif text-lg italic text-ink">This week&apos;s canvas</h1>
        <p className="mt-1 text-sm text-muted">
          Each person adds one thing a day. Freezes Sunday.
        </p>
        <div className="mt-4 flex items-center gap-2">
          {progressMembers.map((member) => (
            <div
              key={member.id}
              className={clsx(
                "rounded-full",
                member.contributed ? "opacity-100 ring-1 ring-accent/40 ring-offset-2 ring-offset-bg" : "opacity-40",
              )}
            >
              <Avatar initials={member.initials} color={member.color} size={30} />
            </div>
          ))}
        </div>
      </section>

      {mockCanvas.frozen ? (
        <section className="mx-4 mb-3 rounded-2xl bg-surface2 p-4 text-center">
          <p className="font-serif text-sm italic text-accent/80">This canvas is now a memory</p>
          <button type="button" className="mt-2 text-xs text-accent">
            View in Memories →
          </button>
        </section>
      ) : !currentUserHasContributed ? (
        <section className="mx-4 mb-3 flex items-center gap-3 rounded-2xl border border-accent/20 bg-plum/20 p-4">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <p className="flex-1 text-sm text-ink">It&apos;s your turn today</p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-bg"
          >
            Add yours
          </button>
        </section>
      ) : null}

      <section>
        {contributions.map((contribution) => (
          <article
            key={contribution.id}
            className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-surface"
          >
            {contribution.type === "photo" ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contribution.imageUrl}
                  alt={`Canvas by ${contribution.author.name}`}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex items-center gap-2 p-3">
                  <span className="text-xs text-muted">{contribution.day}</span>
                  <Avatar initials={contribution.author.initials} color={contribution.author.color} size={20} />
                  <span className="text-xs font-medium text-ink">{contribution.author.name}</span>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-plum/50 to-surface2 p-5">
                <div className="font-serif text-4xl leading-none text-accent/30">&ldquo;</div>
                <p className="mt-1 font-serif text-sm italic leading-relaxed text-ink/90">
                  {contribution.content}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-muted">{contribution.day}</span>
                  <Avatar initials={contribution.author.initials} color={contribution.author.color} size={20} />
                  <span className="text-xs font-medium text-ink">{contribution.author.name}</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>

      <div
        className={clsx(
          "fixed inset-0 z-30 transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Close canvas composer"
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
          <p className="font-serif text-base italic text-ink">Add to this week&apos;s canvas</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("photo")}
              className={clsx(
                "flex items-center gap-3 rounded-2xl border p-4 text-left",
                mode === "photo" ? "border-accent bg-plum/20" : "border-border bg-surface2",
              )}
            >
              <ImageIcon size={18} className="text-accent" />
              <div>
                <p className="text-sm font-medium text-ink">Photo</p>
                <p className="text-xs text-muted">Add an image moment</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode("quote")}
              className={clsx(
                "flex items-center gap-3 rounded-2xl border p-4 text-left",
                mode === "quote" ? "border-accent bg-plum/20" : "border-border bg-surface2",
              )}
            >
              <Quote size={18} className="text-accent" />
              <div>
                <p className="text-sm font-medium text-ink">Quote</p>
                <p className="text-xs text-muted">Write something small</p>
              </div>
            </button>
          </div>

          {mode === "photo" ? (
            <input
              type="url"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="Paste an image URL"
              className="mt-4 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
            />
          ) : (
            <textarea
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              placeholder="What belongs on this week's canvas?"
              className="mt-4 min-h-[110px] w-full resize-none rounded-2xl border border-border bg-surface px-4 py-4 text-sm text-ink outline-none placeholder:text-muted"
            />
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-bg"
          >
            Add to canvas
            <SendHorizonal size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
