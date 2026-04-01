"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { mockUser } from "@/lib/mock-data";

export function TopBar({
  title,
  right,
  rightSlot,
}: Readonly<{ title?: string; right?: React.ReactNode; rightSlot?: React.ReactNode }>) {
  const router = useRouter();

  if (title) {
    return (
      <div
        className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border
                   bg-bg/90 px-4 backdrop-blur-md"
      >
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full
                     border border-border bg-surface transition-transform active:scale-95"
        >
          <ArrowLeft size={16} className="text-ink" />
        </button>
        <p className="flex-1 truncate text-sm font-medium text-ink">{title}</p>
        {right}
      </div>
    );
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-10 mx-auto flex h-14 max-w-[430px] items-center justify-between border-b border-border bg-bg/80 px-5 backdrop-blur-md">
      <div className="font-serif text-xl italic text-accent">talosly</div>
      {rightSlot ?? (
        <Avatar
          initials={mockUser.initials}
          color={mockUser.avatarColor}
          size={34}
          className="border-accent/30"
        />
      )}
    </header>
  );
}
