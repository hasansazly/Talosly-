"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Lock, Plus } from "lucide-react";
import { clsx } from "clsx";
import {
  mockActiveCanvas,
  mockChapters,
  mockUser,
  type CanvasContribution,
} from "@/lib/mock-data";
import {
  ContributionCard,
  ContributeSheet,
  MiniChapterCard,
} from "@/components/CanvasCard";

export default function CanvasPage() {
  const router = useRouter();
  const canvas = mockActiveCanvas;
  const [contributions, setContributions] = useState<CanvasContribution[]>(
    canvas.contributions,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [inputType, setInputType] = useState<"quote" | "photo">("quote");
  const [inputText, setInputText] = useState("");

  const userContributed = contributions.some(
    (contribution) => contribution.author.id === mockUser.id,
  );

  const pendingMembers = canvas.allMembers.filter(
    (member) => !contributions.some((contribution) => contribution.author.id === member.id),
  );

  const urgency =
    canvas.hoursUntilSeal! <= 24
      ? "high"
      : canvas.hoursUntilSeal! <= 72
        ? "medium"
        : "low";

  const urgencyLabel =
    urgency === "high"
      ? `${canvas.hoursUntilSeal}h left`
      : urgency === "medium"
        ? `${Math.ceil(canvas.hoursUntilSeal! / 24)}d left`
        : "Seals Sunday";

  const handleSubmit = () => {
    if (!inputText.trim()) return;

    const newContrib: CanvasContribution = {
      id: `cv-new-${Date.now()}`,
      author: {
        id: mockUser.id,
        name: mockUser.name,
        initials: mockUser.initials,
        color: "bg-plum",
      },
      type: inputType,
      ...(inputType === "quote"
        ? { content: inputText }
        : {
            imageUrl:
              "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&q=80",
            content: inputText,
          }),
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()],
      addedAt: "Just now",
    };

    setContributions((current) => [...current, newContrib]);
    setInputText("");
    setSheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <div
        className="fixed top-0 left-0 right-0 z-10 mx-auto flex h-14 max-w-[430px]
                      items-center justify-between border-b border-border bg-bg/80 px-5
                      backdrop-blur-md"
      >
        <div>
          <span className="font-serif text-lg italic text-accent">Canvas</span>
          <span className="ml-2 text-xs text-muted">{canvas.weekLabel}</span>
        </div>
        <div
          className={clsx(
            "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
            urgency === "high"
              ? "border-red-500/20 bg-red-900/30 text-red-400"
              : urgency === "medium"
                ? "border-amber-500/20 bg-amber-900/30 text-amber-400"
                : "border-border bg-surface2 text-muted",
          )}
        >
          <Lock size={10} />
          {urgencyLabel}
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll pb-28 pt-[72px]">
        <div className="mx-4 mt-2 mb-4 rounded-2xl border border-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                Chapter {canvas.chapterNumber}
              </p>
              <p className="mt-0.5 text-sm font-medium text-ink">{canvas.weekLabel}</p>
            </div>
            <button
              onClick={() => router.push("/memories?tab=chapters")}
              className="flex items-center gap-1.5 rounded-full border border-border
                         bg-surface2 px-3 py-1.5 text-xs text-muted transition-transform
                         active:scale-95"
            >
              <BookOpen size={11} />
              Past chapters
            </button>
          </div>

          <div className="mb-3 flex items-center gap-2">
            {canvas.allMembers.map((member) => {
              const contributed = contributions.some(
                (contribution) => contribution.author.id === member.id,
              );

              return (
                <div key={member.id} className="flex flex-col items-center gap-1">
                  <div
                    className={clsx(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-all",
                      contributed
                        ? "border-accent/30 bg-accent text-bg"
                        : "border-border bg-surface2 text-muted opacity-50",
                    )}
                  >
                    {member.initials}
                  </div>
                  {contributed && <div className="h-1 w-1 rounded-full bg-accent" />}
                </div>
              );
            })}
            <div className="ml-auto text-right">
              <p className="text-sm font-medium text-ink">
                {contributions.length}/{canvas.allMembers.length}
              </p>
              <p className="text-[10px] text-muted">
                {pendingMembers.length === 0 ? "all in" : "contributed"}
              </p>
            </div>
          </div>

          {!userContributed && urgency !== "low" && (
            <div
              className="mt-1 flex items-center gap-2 rounded-xl border border-accent/20
                            bg-plum/20 px-3 py-2"
            >
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent animate-pulse" />
              <p className="flex-1 text-xs text-accent">Add yours before Sunday</p>
              <button
                onClick={() => setSheetOpen(true)}
                className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-bg
                           transition-transform active:scale-95"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {contributions.map((contribution, index) => (
          <ContributionCard
            key={contribution.id}
            contribution={contribution}
            index={index}
          />
        ))}

        {contributions.length === 0 && (
          <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
            <p className="mb-2 font-serif text-lg italic text-ink/40">Nothing here yet</p>
            <p className="text-sm leading-relaxed text-muted">
              Be the first to add something this week. The canvas seals Sunday at
              midnight.
            </p>
          </div>
        )}

        <div className="mx-4 mt-6 mb-2">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Recent chapters
            </p>
            <button
              onClick={() => router.push("/memories?tab=chapters")}
              className="text-xs text-accent"
            >
              See all →
            </button>
          </div>

          {mockChapters.slice(0, 2).map((chapter) => (
            <MiniChapterCard
              key={chapter.id}
              chapter={chapter}
              onPress={() => router.push(`/canvas/chapter/${chapter.id}`)}
            />
          ))}
        </div>
      </div>

      {!userContributed && (
        <button
          onClick={() => setSheetOpen(true)}
          className="fixed bottom-24 right-5 z-20 flex h-14 w-14 items-center justify-center
                     rounded-full bg-accent text-bg shadow-lg shadow-accent/25
                     transition-transform active:scale-95"
        >
          <Plus size={24} className="text-bg" />
        </button>
      )}

      {sheetOpen && (
        <ContributeSheet
          onClose={() => setSheetOpen(false)}
          onSubmit={handleSubmit}
          inputType={inputType}
          setInputType={setInputType}
          inputText={inputText}
          setInputText={setInputText}
          chapterNumber={canvas.chapterNumber}
        />
      )}
    </div>
  );
}
