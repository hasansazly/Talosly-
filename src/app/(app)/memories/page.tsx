"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Plus } from "lucide-react";
import { clsx } from "clsx";
import { Avatar } from "@/components/Avatar";
import { ChapterRow } from "@/components/ChapterCard";
import { mockChapters, mockMemories } from "@/lib/mock-data";

export default function MemoriesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = searchParams.get("tab") === "chapters" ? "chapters" : "memories";
  const [activeTab, setActiveTab] = useState<"memories" | "chapters">(defaultTab);
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    setDraft("");
    setDate("");
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div
        className="fixed left-0 right-0 top-0 z-10 mx-auto flex h-14 max-w-[430px] items-center
                   border-b border-border bg-bg/80 px-5 backdrop-blur-md"
      >
        <span className="font-serif text-lg italic text-accent">Memories</span>
      </div>

      <div
        className="fixed left-0 right-0 top-14 z-10 mx-auto flex max-w-[430px] gap-2 border-b border-border
                   bg-bg px-4 py-2"
      >
        {(["memories", "chapters"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "flex-1 rounded-xl border py-2 text-sm font-medium transition-all active:scale-[0.98]",
              activeTab === tab
                ? "border-accent/40 bg-plum/40 text-accent"
                : "border-border bg-surface text-muted",
            )}
          >
            {tab === "memories" ? "Memories" : "Chapters"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-scroll pb-24 pt-28">
        {activeTab === "memories" ? (
          <div className="columns-2 gap-3 space-y-3 px-4">
            {mockMemories.map((memory) => (
              <div key={memory.id} className="mb-3 break-inside-avoid">
                {memory.hasImage ? (
                  <article className="overflow-hidden rounded-2xl border border-border bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={memory.imageUrl}
                      alt={memory.body ?? `Memory from ${memory.date}`}
                      className="w-full object-cover"
                    />
                    <div className="p-3">
                      <p className="text-[10px] uppercase tracking-widest text-muted">
                        {memory.date}
                      </p>
                      {memory.body ? (
                        <p className="mt-1 text-xs leading-relaxed text-ink/80">{memory.body}</p>
                      ) : null}
                      <div className="mt-2 flex justify-end">
                        <Avatar initials={memory.author.initials} color={memory.author.color} size={18} />
                      </div>
                    </div>
                  </article>
                ) : (
                  <article
                    className={clsx(
                      "rounded-2xl border border-border bg-gradient-to-br p-4",
                      memory.gradient,
                    )}
                  >
                    <p className="font-serif text-sm italic leading-relaxed text-accent/90">
                      {memory.body}
                    </p>
                    <p className="mt-2 text-[10px] text-muted">{memory.date}</p>
                    <div className="mt-3 flex justify-end">
                      <Avatar initials={memory.author.initials} color={memory.author.color} size={18} />
                    </div>
                  </article>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4">
            <p className="mb-4 text-xs leading-relaxed text-muted">
              Every Sunday a new chapter is sealed. These are yours.
            </p>
            {mockChapters.map((chapter) => (
              <ChapterRow
                key={chapter.id}
                chapter={chapter}
                onPress={() => router.push(`/canvas/chapter/${chapter.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Add memory"
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
          aria-label="Close memory sheet"
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
          <p className="mb-2 text-xs text-muted">Capture a memory</p>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write the moment you want to keep."
            className="min-h-[100px] w-full resize-none bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <label className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-3 text-sm text-muted">
            <CalendarDays size={16} className="text-accent" />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full bg-transparent text-ink outline-none [color-scheme:dark]"
            />
          </label>
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
