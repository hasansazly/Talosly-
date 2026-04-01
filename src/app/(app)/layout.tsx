"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calendar, MessageCircle } from "lucide-react";

const tabs = [
  { href: "/home", label: "Today", Icon: MessageCircle },
  { href: "/memories", label: "Memories", Icon: BookOpen },
  { href: "/upcoming", label: "Upcoming", Icon: Calendar },
];

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bg bg-radial-noise">
      <main className="flex-1 pb-24">{children}</main>
      <nav
        className="fixed bottom-0 left-0 right-0 mx-auto grid h-16 max-w-[430px] grid-cols-3 border-t border-border bg-surface/90 backdrop-blur-xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
            >
              <Icon
                size={22}
                className={active ? "text-accent" : "text-muted"}
                fill={active ? "currentColor" : "none"}
              />
              <span className={`text-[10px] ${active ? "text-accent" : "text-muted"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
