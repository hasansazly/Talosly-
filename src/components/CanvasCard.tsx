"use client";

import { Lock } from "lucide-react";
import { clsx } from "clsx";
import type { CanvasContribution, WeeklyCanvas } from "@/lib/mock-data";

export function ContributionCard({
  contribution,
  index,
}: {
  contribution: CanvasContribution;
  index: number;
}) {
  return (
    <div
      className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-surface
                    animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {contribution.type === "photo" && contribution.imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={contribution.imageUrl}
            alt=""
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="p-3 flex items-center gap-2">
            <AuthorChip contribution={contribution} />
          </div>
        </>
      ) : (
        <div className="bg-gradient-to-br from-plum/50 to-surface p-5">
          <p className="mb-1 font-serif text-4xl leading-none text-accent/20">
            &quot;
          </p>
          <p className="font-serif text-sm italic leading-relaxed text-ink/90">
            {contribution.content}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <AuthorChip contribution={contribution} />
          </div>
        </div>
      )}
    </div>
  );
}

export function AuthorChip({
  contribution,
}: {
  contribution: CanvasContribution;
}) {
  return (
    <>
      <div
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full
                      border border-accent/20 bg-accent/20 text-[9px] font-medium text-accent"
      >
        {contribution.author.initials}
      </div>
      <span className="text-xs text-muted">{contribution.author.name}</span>
      <span className="ml-auto text-xs text-muted/40">{contribution.day}</span>
    </>
  );
}

export function MiniChapterCard({
  chapter,
  onPress,
}: {
  chapter: WeeklyCanvas;
  onPress: () => void;
}) {
  const photoContribs = chapter.contributions.filter(
    (contribution) => contribution.type === "photo" && contribution.imageUrl,
  );
  const firstPhoto = photoContribs[0];

  return (
    <button
      onClick={onPress}
      className="mb-2 flex w-full items-center gap-3 rounded-2xl border border-border
                 bg-surface p-3 text-left transition-transform active:scale-[0.98]"
    >
      {firstPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={firstPhoto.imageUrl}
          alt=""
          className="h-12 w-12 flex-shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl
                        border border-accent/20 bg-plum/30"
        >
          <Lock size={14} className="text-accent/60" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">Chapter {chapter.chapterNumber}</p>
        <p className="mt-0.5 text-xs text-muted">{chapter.weekLabel}</p>
      </div>

      <div className="flex flex-shrink-0 flex-col items-end gap-1">
        <div className="flex">
          {chapter.contributions.slice(0, 3).map((contribution, index) => (
            <div
              key={contribution.id}
              style={{ marginLeft: index === 0 ? 0 : -5, zIndex: index }}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-bg
                         bg-accent/20 text-[9px] font-medium text-accent"
            >
              {contribution.author.initials}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted">
          {chapter.contributorCount} contributions
        </p>
      </div>
    </button>
  );
}

export function ContributeSheet({
  onClose,
  onSubmit,
  inputType,
  setInputType,
  inputText,
  setInputText,
  chapterNumber,
}: {
  onClose: () => void;
  onSubmit: () => void;
  inputType: "quote" | "photo";
  setInputType: (value: "quote" | "photo") => void;
  inputText: string;
  setInputText: (value: string) => void;
  chapterNumber: number;
}) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
      />

      <div
        className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[430px]
                      rounded-t-3xl bg-surface2 px-5 pb-10 pt-3
                      animate-in slide-in-from-bottom duration-300"
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />

        <p className="mb-5 text-center text-xs text-muted">
          Adding to Chapter {chapterNumber} · Seals Sunday
        </p>

        <div className="mb-4 flex gap-2">
          {(["quote", "photo"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setInputType(type)}
              className={clsx(
                "flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all active:scale-[0.98]",
                inputType === type
                  ? "border-accent/40 bg-plum/40 text-accent"
                  : "border-border bg-surface text-muted",
              )}
            >
              {type === "quote" ? "Write a quote" : "Add a photo"}
            </button>
          ))}
        </div>

        {inputType === "quote" ? (
          <textarea
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Something from this week worth keeping..."
            rows={4}
            autoFocus
            className="w-full resize-none rounded-2xl border border-border bg-surface
                       px-4 py-3 text-sm leading-relaxed text-ink outline-none
                       transition-colors placeholder:text-muted focus:border-accent/40"
          />
        ) : (
          <div
            className="flex aspect-video w-full flex-col items-center justify-center gap-2
                       rounded-2xl border border-dashed border-border bg-surface"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border
                            border-accent/20 bg-plum/40"
            >
              <span className="text-xl text-accent">+</span>
            </div>
            <p className="text-sm text-muted">Choose a photo</p>
            <p className="text-xs text-muted/40">Coming in v1 with Supabase</p>
          </div>
        )}

        <p className="mb-5 mt-3 text-center text-xs text-muted/50">
          One contribution per day. Visible to your circle after Sunday.
        </p>

        <button
          onClick={onSubmit}
          disabled={inputType === "quote" && !inputText.trim()}
          className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg
                     transition-all active:scale-[0.98] disabled:opacity-30"
        >
          Add to Chapter {chapterNumber}
        </button>
      </div>
    </>
  );
}
