"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock } from "lucide-react";
import { mockUser, type TimeCapsule } from "@/lib/mock-data";
import { TopBar } from "@/components/TopBar";

function isCurrentUserContribution(capsule: TimeCapsule) {
  return capsule.contributions.some(
    (contribution) =>
      contribution.author.id === mockUser.id ||
      contribution.author.name === mockUser.name ||
      contribution.author.initials === mockUser.initials,
  );
}

function formatUnlockDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function CapsuleCollectingView({ capsule }: { capsule: TimeCapsule }) {
  const router = useRouter();
  const contributed = isCurrentUserContribution(capsule);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar title={capsule.name} />

      <div className="flex-1 overflow-y-scroll px-4 pb-24 pt-4">
        <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              Collecting
            </span>
            <span className="rounded-full border border-amber-500/20 bg-amber-900/30 px-2.5 py-1 text-xs text-amber-400">
              Closes in 5 days
            </span>
          </div>
          <p className="font-serif text-sm italic leading-relaxed text-ink/80">
            {capsule.triggerType === "date" && capsule.unlockDate
              ? `Opens ${formatUnlockDate(capsule.unlockDate)}`
              : capsule.triggerLabel}
          </p>
        </div>

        <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 text-sm font-medium text-ink">
            {capsule.contributions.length} of {capsule.allMembers.length} have added something
          </p>
          <div className="flex flex-col gap-2.5">
            {capsule.allMembers.map((member) => {
              const hasContribution = capsule.contributions.some((c) => c.author.id === member.id);
              return (
                <div key={member.id} className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium ${
                      hasContribution
                        ? "border-accent/30 bg-accent text-bg"
                        : "border-border bg-surface2 text-muted"
                    }`}
                  >
                    {member.initials}
                  </div>
                  <span className={`text-sm ${hasContribution ? "text-ink" : "text-muted"}`}>
                    {member.name}
                  </span>
                  <div className="ml-auto">
                    {hasContribution ? (
                      <span className="text-xs text-success">✓ Added</span>
                    ) : (
                      <span className="text-xs text-muted">Pending</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!contributed ? (
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-accent/20 bg-plum/20 p-4">
            <div className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">It&apos;s your turn</p>
              <p className="mt-0.5 text-xs text-muted">Add something before it seals</p>
            </div>
            <button
              onClick={() => router.push(`/capsule/${capsule.id}/contribute`)}
              className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-bg transition-transform active:scale-95"
            >
              Add yours
            </button>
          </div>
        ) : null}

        <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
            Inside so far
          </p>
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl bg-surface2 p-3 text-center">
              <p className="text-lg font-medium text-ink">
                {capsule.contributions.filter((c) => c.type === "text").length}
              </p>
              <p className="mt-0.5 text-xs text-muted">notes</p>
            </div>
            <div className="flex-1 rounded-xl bg-surface2 p-3 text-center">
              <p className="text-lg font-medium text-ink">
                {capsule.contributions.filter((c) => c.type === "photo").length}
              </p>
              <p className="mt-0.5 text-xs text-muted">photos</p>
            </div>
            <div className="flex-1 rounded-xl bg-surface2 p-3 text-center">
              <p className="text-lg font-medium text-ink">0</p>
              <p className="mt-0.5 text-xs text-muted">voice</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] border-t border-border bg-bg/90 p-4 pb-8 backdrop-blur-xl">
        <button
          onClick={() => router.push(`/capsule/${capsule.id}/seal`)}
          className="w-full rounded-2xl border border-border bg-surface py-3.5 text-sm text-muted transition-transform active:scale-[0.98]"
        >
          Seal now (skips waiting period)
        </button>
      </div>
    </div>
  );
}

export function CapsuleSealedView({ capsule }: { capsule: TimeCapsule }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar title={capsule.name} />

      <div className="flex-1 overflow-y-scroll px-4 pb-24 pt-4">
        <div className="mb-4 rounded-3xl border border-accent/10 bg-plum/20 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-plum/60">
            <Lock size={28} className="text-accent" />
          </div>
          <p className="mb-1 font-serif text-xl italic text-ink">{capsule.name}</p>
          <p className="text-sm text-muted">
            Sealed {capsule.sealedAt} · {capsule.contributions.length} contributions inside
          </p>
          <div className="mt-4 inline-block rounded-full bg-surface2 px-4 py-2">
            <p className="text-sm font-medium text-accent">
              {capsule.triggerType === "date"
                ? `Opens in ${capsule.daysUntilUnlock} days`
                : capsule.triggerType === "event"
                  ? `🔑 ${capsule.triggerLabel}`
                  : "Opens when the circle agrees"}
            </p>
          </div>
        </div>

        {capsule.triggerType === "date" ? (
          <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
            <div className="mb-2 flex justify-between">
              <span className="text-xs text-muted">Sealed</span>
              <span className="text-xs text-muted">{capsule.daysUntilUnlock}d remaining</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent/40 to-accent transition-all duration-1000"
                style={{ width: `${capsule.progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-[10px] text-muted">{capsule.sealedAt}</span>
              <span className="text-[10px] text-accent">
                {capsule.unlockDate
                  ? new Date(capsule.unlockDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>
        ) : null}

        <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
            Contributions sealed inside
          </p>
          <div className="flex flex-col gap-3">
            {capsule.contributions.map((contribution) => (
              <div key={contribution.id} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-medium text-bg">
                  {contribution.author.initials}
                </div>
                <span className="text-sm text-ink">{contribution.author.name}</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Lock size={12} className="text-muted" />
                  <span className="text-xs text-muted">
                    {contribution.type === "text"
                      ? "A note"
                      : contribution.type === "photo"
                        ? "A photo"
                        : "Voice memo"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {capsule.triggerType === "event" ? (
          <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
            <p className="mb-1 text-sm font-medium text-ink">Ready to open?</p>
            <p className="mb-3 text-xs leading-relaxed text-muted">
              If &quot;{capsule.triggerLabel?.replace("When ", "")}&quot; has happened, any
              member of the circle can unlock this now.
            </p>
            <button
              onClick={() => router.push(`/capsule/${capsule.id}/open`)}
              className="w-full rounded-xl border border-accent/30 bg-plum/40 py-3 text-sm font-medium text-accent transition-transform active:scale-[0.98]"
            >
              It happened — open the capsule
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CapsuleUnlockedView({ capsule }: { capsule: TimeCapsule }) {
  const router = useRouter();
  const [revealed, setRevealed] = useState<string[]>([]);
  const [allRevealed, setAllRevealed] = useState(false);

  const revealNext = () => {
    const next = capsule.contributions[revealed.length];
    if (!next) {
      setAllRevealed(true);
      return;
    }
    setRevealed((prev) => [...prev, next.id]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar title={capsule.name} />

      <div className="flex-1 overflow-y-scroll px-4 pb-32 pt-4">
        <div className="mb-2 py-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-success/20 bg-success/10">
            <Unlock size={28} className="text-success" />
          </div>
          <p className="mb-1 font-serif text-xl italic text-ink">{capsule.name}</p>
          <p className="text-sm text-muted">Opened {capsule.unlockedAt}</p>
        </div>

        {capsule.contributions.map((contribution, index) => {
          const isRevealed = revealed.includes(contribution.id);
          const isNext = revealed.length === index;

          return (
            <div
              key={contribution.id}
              onClick={() => isNext && !isRevealed && revealNext()}
              className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-500 active:scale-[0.98] ${
                isRevealed
                  ? "border-border bg-surface"
                  : isNext
                    ? "cursor-pointer border-accent/30 bg-plum/30"
                    : "border-border bg-surface2 opacity-40"
              }`}
            >
              {!isRevealed ? (
                <div className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-plum/40">
                    <span className="text-sm font-medium text-accent">
                      {contribution.author.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">{contribution.author.name}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {contribution.type === "text"
                        ? "Wrote a note"
                        : contribution.type === "photo"
                          ? "Added a photo"
                          : "Left a voice memo"}
                    </p>
                  </div>
                  {isNext ? (
                    <div className="animate-pulse rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-bg">
                      Tap to open
                    </div>
                  ) : null}
                </div>
              ) : (
                <div>
                  {contribution.type === "photo" && contribution.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={contribution.imageUrl} alt="" className="aspect-[4/3] w-full object-cover" />
                  ) : null}
                  <div className="p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-medium text-bg">
                        {contribution.author.initials}
                      </div>
                      <span className="text-sm font-medium text-ink">{contribution.author.name}</span>
                      <span className="ml-auto text-xs text-muted">Added {contribution.addedAt}</span>
                    </div>
                    {contribution.type === "text" && contribution.text ? (
                      <p className="font-serif text-sm italic leading-relaxed text-ink/90">
                        &quot;{contribution.text}&quot;
                      </p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {allRevealed ? (
          <div className="py-6 text-center">
            <p className="font-serif text-sm italic text-ink/60">That&apos;s everything inside.</p>
            <p className="mt-1 text-xs text-muted">This capsule lives in your Memories now.</p>
            <button onClick={() => router.push("/memories")} className="mt-4 text-sm text-accent">
              View in Memories →
            </button>
          </div>
        ) : null}
      </div>

      {!allRevealed ? (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] border-t border-border bg-bg/90 p-4 pb-8 backdrop-blur-xl">
          <button
            onClick={revealNext}
            className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
          >
            {revealed.length === 0
              ? "Start opening"
              : revealed.length < capsule.contributions.length
                ? `Open next (${capsule.contributions.length - revealed.length} left)`
                : "See all memories"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
