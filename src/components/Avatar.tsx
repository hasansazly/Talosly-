import { clsx } from "clsx";

interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  className?: string;
}

export function Avatar({
  initials,
  color = "bg-plum",
  size = 32,
  className,
}: AvatarProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full border border-accent/20 text-accent font-medium",
        color,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
