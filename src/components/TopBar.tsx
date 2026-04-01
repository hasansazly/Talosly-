import { Avatar } from "@/components/Avatar";
import { mockUser } from "@/lib/mock-data";

export function TopBar({
  rightSlot,
}: Readonly<{ rightSlot?: React.ReactNode }>) {
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
