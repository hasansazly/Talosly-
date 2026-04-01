"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { clsx } from "clsx";
import type { Echo } from "@/lib/mock-data";

const ECHO_EMOJIS = ["🤍", "🥹", "😂", "✨"];

export function EchoCard({
  echo,
  onDismiss,
}: {
  echo: Echo;
  onDismiss: (id: string) => void;
}) {
  const [reactions, setReactions] = useState(echo.reactions);
  const [localDismissed, setLocalDismissed] = useState(false);

  const handleReact = (emoji: string) => {
    setReactions((prev) => {
      const existing = prev.find((reaction) => reaction.emoji === emoji);
      if (existing) {
        return prev.map((reaction) =>
          reaction.emoji === emoji
            ? {
                ...reaction,
                count: reaction.reacted ? reaction.count - 1 : reaction.count + 1,
                reacted: !reaction.reacted,
              }
            : reaction,
        );
      }

      return [...prev, { emoji, count: 1, reacted: true }];
    });
  };

  const handleDismiss = () => {
    setLocalDismissed(true);
    window.setTimeout(() => onDismiss(echo.id), 300);
  };

  if (localDismissed) return null;

  return (
    <div
      className={`mx-4 mb-3 overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br
                  from-plum/30 to-surface transition-all duration-300 ${
                    localDismissed ? "scale-95 opacity-0" : "scale-100 opacity-100"
                  }`}
    >
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-accent">✦</span>
          <span className="text-xs font-medium tracking-wide text-accent">Echo</span>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">{echo.originalDate}</span>
        </div>
        <button
          onClick={handleDismiss}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-surface2/60 transition-transform active:scale-90"
        >
          <X size={10} className="text-muted" />
        </button>
      </div>

      {echo.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={echo.imageUrl} alt="" className="aspect-[16/9] w-full object-cover" />
      ) : null}

      <div className="px-4 pb-1 pt-2">
        <div className="mb-2 flex items-center gap-2">
          <div
            className={clsx(
              "flex h-6 w-6 items-center justify-center rounded-full border border-accent/20 bg-accent/20 text-[10px] font-medium text-accent",
            )}
          >
            {echo.author.initials}
          </div>
          <span className="text-xs text-muted">{echo.author.name}</span>
        </div>

        {echo.content ? (
          <p className="mb-2 font-serif text-sm italic leading-relaxed text-ink/85">
            &quot;{echo.content}&quot;
          </p>
        ) : null}

        <p className="mb-3 text-xs italic text-muted/60">{echo.prompt}</p>
      </div>

      <div className="px-4 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {reactions
            .filter((reaction) => reaction.count > 0)
            .map((reaction) => (
              <button
                key={reaction.emoji}
                onClick={() => handleReact(reaction.emoji)}
                className={clsx(
                  "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-all active:scale-95",
                  reaction.reacted
                    ? "border-accent/30 bg-plum/40 text-accent"
                    : "border-border bg-surface2 text-muted",
                )}
              >
                <span style={{ fontSize: 13 }}>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}

          {ECHO_EMOJIS.filter((emoji) => !reactions.find((reaction) => reaction.emoji === emoji && reaction.reacted))
            .slice(0, 2)
            .map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReact(emoji)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface2 transition-transform active:scale-90"
              >
                <span style={{ fontSize: 13 }}>{emoji}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
