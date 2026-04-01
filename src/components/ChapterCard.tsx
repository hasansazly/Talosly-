"use client";

import { clsx } from "clsx";
import type { WeeklyCanvas } from "@/lib/mock-data";

export function ChapterRow({
  chapter,
  onPress,
}: {
  chapter: WeeklyCanvas;
  onPress: () => void;
}) {
  const photos = chapter.contributions
    .filter((contribution) => contribution.type === "photo" && contribution.imageUrl)
    .slice(0, 3);

  return (
    <button
      onClick={onPress}
      className="mb-3 w-full overflow-hidden rounded-2xl border border-border bg-surface text-left transition-transform active:scale-[0.98]"
    >
      {photos.length > 0 ? (
        <div
          className={clsx(
            "grid gap-0.5",
            photos.length === 1 ? "grid-cols-1" : photos.length === 2 ? "grid-cols-2" : "grid-cols-3",
          )}
        >
          {photos.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={photo.id} src={photo.imageUrl} alt="" className="aspect-square w-full object-cover" />
          ))}
        </div>
      ) : (
        <div className="flex h-20 w-full items-center bg-gradient-to-r from-plum/40 to-surface px-5">
          <p className="truncate font-serif text-sm italic text-accent/60">
            {chapter.contributions.find((contribution) => contribution.type === "quote")?.content ??
              "A quiet week"}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between p-3">
        <div>
          <p className="text-sm font-medium text-ink">Chapter {chapter.chapterNumber}</p>
          <p className="mt-0.5 text-xs text-muted">{chapter.weekLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex">
            {chapter.contributions
              .filter(
                (contribution, index, all) =>
                  all.findIndex((item) => item.author.id === contribution.author.id) === index,
              )
              .slice(0, 4)
              .map((contribution, index) => (
                <div
                  key={contribution.author.id}
                  style={{ marginLeft: index === 0 ? 0 : -5, zIndex: index }}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-bg bg-accent/20 text-[9px] font-medium text-accent"
                >
                  {contribution.author.initials}
                </div>
              ))}
          </div>
          <p className="text-[10px] text-muted">{chapter.contributorCount} contributed</p>
        </div>
      </div>
    </button>
  );
}
