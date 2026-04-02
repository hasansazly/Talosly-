"use client";

export default function ContributedPage() {
  return (
    <div
      className="mx-auto flex min-h-screen max-w-[430px] flex-col items-center
                 justify-center bg-bg px-6 text-center"
    >
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border
                      border-success/20 bg-success/10"
      >
        <span className="text-2xl text-success">✓</span>
      </div>

      <p className="mb-2 font-serif text-2xl italic text-ink">You&apos;re in.</p>
      <p className="mb-10 max-w-[280px] text-sm leading-relaxed text-muted">
        Your contribution is sealed inside the circle. Download Talosly to see what
        everyone else added.
      </p>

      <div className="flex w-full flex-col gap-3">
        <button
          className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg
                     transition-transform active:scale-[0.98]"
        >
          Download for iPhone
        </button>
        <button
          className="w-full rounded-2xl border border-border bg-surface py-4 text-sm
                     text-muted transition-transform active:scale-[0.98]"
        >
          Download for Android
        </button>
      </div>

      <p className="mt-8 max-w-[260px] text-xs leading-relaxed text-muted/40">
        Free. Private. No algorithm. Your circle is waiting.
      </p>

      <span className="mt-10 font-serif text-lg italic text-accent/40">talosly</span>
    </div>
  );
}
