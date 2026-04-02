"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockInvite } from "@/lib/mock-data";

export default function JoinPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [contribution, setContribution] = useState("");
  const [step, setStep] = useState<"intro" | "contribute">("intro");

  const invite = mockInvite;

  return (
    <div
      className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-bg px-6 py-12"
    >
      <div className="mb-10">
        <span className="font-serif text-2xl italic text-accent">talosly</span>
      </div>

      {step === "intro" && (
        <>
          <p className="mb-1 text-sm text-muted">{invite.invitedBy} invited you to</p>
          <p className="mb-8 font-serif text-3xl italic leading-tight text-ink">
            {invite.circleName}
          </p>

          <div className="mb-8 rounded-2xl border border-border bg-surface p-4">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border
                              border-accent/20 bg-plum/40 text-xs font-medium text-accent"
              >
                {invite.previewCheckin.author.initials}
              </div>
              <span className="text-sm font-medium text-ink">
                {invite.previewCheckin.author.name}
              </span>
              <span className="ml-auto text-xs text-muted">
                {invite.previewCheckin.timestamp}
              </span>
            </div>
            <p className="font-serif text-sm italic leading-relaxed text-ink/85">
              &quot;{invite.previewCheckin.body}&quot;
            </p>
          </div>

          <div className="mb-10 flex flex-col gap-3">
            {[
              "A private space for your closest circle.",
              "Daily check-ins. Weekly chapters. Time capsules.",
              "No followers. No public feed. Just you and them.",
            ].map((line, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/50" />
                <p className="text-sm leading-relaxed text-muted">{line}</p>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="mb-4 w-full rounded-2xl border border-border bg-surface2 px-4 py-3.5
                       text-base text-ink outline-none transition-colors
                       placeholder:text-muted focus:border-accent/50"
          />

          <button
            onClick={() => name.trim() && setStep("contribute")}
            disabled={!name.trim()}
            className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg
                       transition-all active:scale-[0.98] disabled:opacity-30"
          >
            Join the circle
          </button>

          <p className="mt-4 text-center text-xs text-muted/50">
            Private. Your name is only visible to this circle.
          </p>
        </>
      )}

      {step === "contribute" && (
        <>
          <p className="mb-1 text-sm text-muted">Welcome, {name}.</p>
          <p className="mb-2 font-serif text-2xl italic leading-snug text-ink">
            Add one thing before you arrive.
          </p>
          <p className="mb-8 text-sm leading-relaxed text-muted">
            One sentence, one memory. It&apos;ll be waiting in the circle when you
            download the app.
          </p>

          <textarea
            value={contribution}
            onChange={(event) => setContribution(event.target.value)}
            placeholder="Something small is fine."
            rows={5}
            autoFocus
            className="mb-3 w-full resize-none rounded-2xl border border-border bg-surface2
                       px-4 py-3.5 text-sm leading-relaxed text-ink outline-none
                       transition-colors placeholder:text-muted focus:border-accent/50"
          />

          <button
            onClick={() => contribution.trim() && router.push("/join/abc123/contributed")}
            disabled={!contribution.trim()}
            className="mb-3 w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg
                       transition-all active:scale-[0.98] disabled:opacity-30"
          >
            Add to {invite.circleName}
          </button>

          <button
            onClick={() => router.push("/join/abc123/contributed")}
            className="w-full py-2 text-sm text-muted"
          >
            Skip for now
          </button>
        </>
      )}
    </div>
  );
}
