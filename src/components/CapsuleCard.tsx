"use client";

import { ChevronRight, Clock, Lock, Unlock } from "lucide-react";
import { clsx } from "clsx";
import type { TimeCapsule } from "@/lib/mock-data";

export function CapsuleCard({ capsule }: { capsule: TimeCapsule }) {
  const contributorCount = capsule.contributions.length;
  const totalMembers = capsule.allMembers.length;
  const pendingCount = totalMembers - contributorCount;

  const statusConfig = {
    collecting: {
      icon: Clock,
      iconBg: "bg-amber-900/30 border-amber-500/20",
      iconColor: "text-amber-400",
      badge: "bg-amber-900/30 text-amber-400 border border-amber-500/20",
      badgeLabel: `${pendingCount} haven't added yet`,
    },
    sealed: {
      icon: Lock,
      iconBg: "bg-plum/40 border-accent/20",
      iconColor: "text-accent",
      badge: "bg-plum/30 text-accent/80 border border-accent/20",
      badgeLabel:
        capsule.triggerType === "event"
          ? capsule.triggerLabel!
          : `Opens in ${capsule.daysUntilUnlock}d`,
    },
    unlocked: {
      icon: Unlock,
      iconBg: "bg-success/10 border-success/20",
      iconColor: "text-success",
      badge: "bg-success/10 text-success border border-success/20",
      badgeLabel: "Ready to open",
    },
  } as const;

  const cfg = statusConfig[capsule.status];
  const Icon = cfg.icon;

  return (
    <div
      className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-surface
                 transition-transform active:scale-[0.98]"
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={clsx(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border",
            cfg.iconBg,
          )}
        >
          <Icon size={16} className={cfg.iconColor} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{capsule.name}</p>
          <p className="mt-0.5 text-xs text-muted">
            {capsule.status === "collecting"
              ? `${contributorCount} of ${totalMembers} contributed`
              : capsule.status === "sealed"
                ? `Sealed ${capsule.sealedAt} · ${contributorCount} contributions`
                : `Opened ${capsule.unlockedAt}`}
          </p>
          <div className="mt-2 flex">
            {capsule.allMembers.slice(0, 5).map((member, i) => {
              const contributed = capsule.contributions.some((c) => c.author.id === member.id);
              return (
                <div
                  key={member.id}
                  style={{ marginLeft: i === 0 ? 0 : -6, zIndex: i }}
                  className={clsx(
                    "flex h-5 w-5 items-center justify-center rounded-full border border-bg text-[9px] font-medium",
                    contributed ? "bg-accent text-bg" : "bg-surface2 text-muted",
                  )}
                >
                  {member.initials}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          <ChevronRight size={14} className="text-muted" />
          <span className={clsx("rounded-full px-2 py-0.5 text-[10px]", cfg.badge)}>
            {cfg.badgeLabel}
          </span>
        </div>
      </div>

      {capsule.status === "sealed" ? (
        <div className="h-0.5 w-full bg-border">
          <div
            className="h-full bg-accent/50 transition-all duration-700"
            style={{ width: `${capsule.progressPercent ?? 0}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
