"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { clsx } from "clsx";
import { mockChapters } from "@/lib/mock-data";
import { TopBar } from "@/components/TopBar";

export default function ChapterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const chapter = mockChapters.find((item) => item.id === id);

  if (!chapter) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBar
        title={`Chapter ${chapter.chapterNumber}`}
        right={<span className="text-xs text-muted">{chapter.weekLabel}</span>}
      />

      <div className="flex-1 overflow-y-scroll pb-20 pt-4">
        <div className="mx-4 mb-4 rounded-3xl border border-accent/10 bg-plum/20 p-5 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-plum/40">
            <Lock size={20} className="text-accent" />
          </div>
          <p className="mb-1 font-serif text-xl italic text-ink">Chapter {chapter.chapterNumber}</p>
          <p className="text-sm text-muted">{chapter.weekLabel}</p>
          <p className="mt-1 text-xs text-muted/60">
            Sealed {chapter.sealedAt} · {chapter.contributorCount} contributions
          </p>

          <div className="mt-4 flex justify-center gap-2">
            {chapter.allMembers.map((member) => {
              const contributed = chapter.contributions.some(
                (contribution) => contribution.author.id === member.id,
              );
              return (
                <div
                  key={member.id}
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition-all",
                    contributed
                      ? "border-accent/30 bg-accent text-bg"
                      : "border-border bg-surface2 text-muted opacity-30",
                  )}
                >
                  {member.initials}
                </div>
              );
            })}
          </div>
        </div>

        {chapter.contributions.map((contribution) => (
          <div key={contribution.id} className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-surface">
            {contribution.type === "photo" && contribution.imageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={contribution.imageUrl} alt="" className="aspect-[4/3] w-full object-cover" />
                <div className="flex items-center gap-2 p-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-accent/20 bg-accent/20 text-[9px] font-medium text-accent">
                    {contribution.author.initials}
                  </div>
                  <span className="text-xs text-muted">{contribution.author.name}</span>
                  <span className="ml-auto text-xs text-muted/40">
                    {contribution.day} · {contribution.addedAt}
                  </span>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-plum/50 to-surface p-5">
                <p className="mb-1 font-serif text-4xl leading-none text-accent/20">&quot;</p>
                <p className="font-serif text-sm italic leading-relaxed text-ink/90">
                  {contribution.content}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-accent/20 bg-accent/20 text-[9px] font-medium text-accent">
                    {contribution.author.initials}
                  </div>
                  <span className="text-xs text-muted">{contribution.author.name}</span>
                  <span className="ml-auto text-xs text-muted/40">{contribution.day}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
