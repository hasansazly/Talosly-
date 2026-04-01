"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { mockCapsules } from "@/lib/mock-data";
import { TopBar } from "@/components/TopBar";

export default function CapsuleContributePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const capsule = mockCapsules.find((item) => item.id === id);

  if (!capsule) notFound();

  const [text, setText] = useState("");
  const [type, setType] = useState<"text" | "photo">("text");

  return (
    <div className="min-h-screen bg-bg">
      <TopBar title="Add your piece" />

      <div className="px-6 pb-8 pt-8">
        <p className="mb-2 font-serif text-2xl italic leading-snug text-ink">
          Add to {capsule.name}
        </p>
        <p className="mb-6 text-sm leading-relaxed text-muted">
          Your contribution stays hidden until the whole capsule opens.
        </p>

        <div className="mb-4 flex gap-2">
          {(["text", "photo"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={clsx(
                "flex-1 rounded-xl border py-2 text-sm font-medium transition-all active:scale-[0.98]",
                type === t
                  ? "border-accent/40 bg-plum/40 text-accent"
                  : "border-border bg-surface text-muted",
              )}
            >
              {t === "text" ? "Write a note" : "Add a photo"}
            </button>
          ))}
        </div>

        {type === "text" ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want future-you to remember about right now?"
            rows={7}
            className="w-full resize-none rounded-2xl border border-border bg-surface2 px-4 py-3.5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-muted focus:border-accent/50"
            autoFocus
          />
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-plum/40">
              <span className="text-lg text-accent">+</span>
            </div>
            <p className="text-sm text-muted">Tap to choose a photo</p>
            <p className="text-xs text-muted/50">Coming soon in v1</p>
          </div>
        )}

        <p className="mt-4 text-center text-xs leading-relaxed text-muted">
          The circle will only see that you added something, not what it is.
        </p>

        <div className="mt-6">
          <button
            onClick={() => router.push(`/capsule/${capsule.id}/seal`)}
            disabled={type === "text" && !text.trim()}
            className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg transition-all active:scale-[0.98] disabled:opacity-30"
          >
            Seal my contribution
          </button>
          <button
            onClick={() => router.push(`/capsule/${capsule.id}`)}
            className="mt-3 w-full py-2 text-sm text-muted"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
