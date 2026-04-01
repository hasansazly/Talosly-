"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Users, Zap } from "lucide-react";
import { clsx } from "clsx";

type Step = 1 | 2 | 3;
type TriggerType = "date" | "event" | "circle";

export default function NewCapsulePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [triggerType, setTriggerType] = useState<TriggerType>("date");
  const [unlockDate, setUnlockDate] = useState("");
  const [triggerLabel, setTriggerLabel] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <button
          onClick={() => (step === 1 ? router.back() : setStep((s) => (s - 1) as Step))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface active:scale-95"
        >
          <ArrowLeft size={16} className="text-ink" />
        </button>
        <span className="font-serif text-base italic text-accent">New capsule</span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step ? "w-4 bg-accent" : s < step ? "w-1.5 bg-accent/40" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex h-full w-[300%] transition-transform duration-300"
          style={{ transform: `translateX(-${(step - 1) * 33.3333}%)` }}
        >
          <div className="w-full shrink-0 px-6 pt-10">
            <p className="mb-2 font-serif text-2xl italic leading-snug text-ink">What is this capsule for?</p>
            <p className="mb-8 text-sm leading-relaxed text-muted">
              Give it a name that will mean something when it opens.
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Before Jamie moves to London"
              className="w-full rounded-2xl border border-border bg-surface2 px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-accent/50"
              autoFocus
            />
            <div className="mt-4 flex flex-col gap-2">
              {[
                "For Priya's graduation",
                "One year from today",
                "Before we all move away",
                "When we finally do the road trip",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setName(suggestion)}
                  className="rounded-xl border border-border bg-surface px-4 py-2.5 text-left text-sm text-muted transition-transform active:scale-[0.98]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="mt-auto pb-8 pt-8">
              <button
                onClick={() => name.trim() && setStep(2)}
                disabled={!name.trim()}
                className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg transition-all active:scale-[0.98] disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>

          <div className="w-full shrink-0 px-6 pt-10">
            <p className="mb-2 font-serif text-2xl italic leading-snug text-ink">When should it open?</p>
            <p className="mb-8 text-sm leading-relaxed text-muted">Choose what unlocks this capsule.</p>

            <div className="mb-6 flex flex-col gap-3">
              {([
                {
                  type: "date" as TriggerType,
                  Icon: Calendar,
                  label: "On a specific date",
                  sub: "Opens automatically on the date you choose",
                },
                {
                  type: "event" as TriggerType,
                  Icon: Zap,
                  label: "When something happens",
                  sub: "Any circle member can trigger the opening",
                },
                {
                  type: "circle" as TriggerType,
                  Icon: Users,
                  label: "When the circle agrees",
                  sub: "Everyone must tap \"open\" to unlock it",
                },
              ] as const).map(({ type, Icon, label, sub }) => (
                <button
                  key={type}
                  onClick={() => setTriggerType(type)}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all active:scale-[0.98]",
                    triggerType === type ? "border-accent/40 bg-plum/40" : "border-border bg-surface",
                  )}
                >
                  <div
                    className={clsx(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border",
                      triggerType === type
                        ? "border-accent/30 bg-accent/20"
                        : "border-border bg-surface2",
                    )}
                  >
                    <Icon size={16} className={triggerType === type ? "text-accent" : "text-muted"} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${triggerType === type ? "text-ink" : "text-ink/80"}`}>
                      {label}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{sub}</p>
                  </div>
                  {triggerType === type ? (
                    <div className="ml-auto flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                      <div className="h-1.5 w-1.5 rounded-full bg-bg" />
                    </div>
                  ) : null}
                </button>
              ))}
            </div>

            {triggerType === "date" ? (
              <input
                type="date"
                value={unlockDate}
                onChange={(e) => setUnlockDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-2xl border border-border bg-surface2 px-4 py-3.5 text-base text-ink outline-none transition-colors focus:border-accent/50"
              />
            ) : null}
            {triggerType === "event" ? (
              <input
                type="text"
                value={triggerLabel}
                onChange={(e) => setTriggerLabel(e.target.value)}
                placeholder="e.g. When Priya graduates"
                className="w-full rounded-2xl border border-border bg-surface2 px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-accent/50"
              />
            ) : null}
            {triggerType === "circle" ? (
              <div className="rounded-2xl border border-border bg-surface2 px-4 py-3.5">
                <p className="text-sm text-muted">
                  Everyone in the circle will need to tap &quot;Open now&quot; at the same time.
                  Great for in-person moments.
                </p>
              </div>
            ) : null}

            <div className="mt-auto pb-8 pt-8">
              <button
                onClick={() => setStep(3)}
                disabled={
                  (triggerType === "date" && !unlockDate) ||
                  (triggerType === "event" && !triggerLabel.trim())
                }
                className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg transition-all active:scale-[0.98] disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>

          <div className="w-full shrink-0 px-6 pt-10">
            <p className="mb-2 font-serif text-2xl italic leading-snug text-ink">Add your piece</p>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Write something for future-you and your circle to read when this opens.
              Others will add theirs over the next 7 days.
            </p>
            <ContributionInput onSeal={() => router.push("/upcoming")} capsuleName={name} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContributionInput({
  onSeal,
  capsuleName,
}: {
  onSeal: () => void;
  capsuleName: string;
}) {
  const [text, setText] = useState("");
  const [type, setType] = useState<"text" | "photo">("text");

  return (
    <>
      <div className="mb-4 rounded-2xl border border-border bg-surface px-4 py-3">
        <p className="text-xs uppercase tracking-widest text-muted">Capsule name</p>
        <p className="mt-1 text-sm font-medium text-ink">{capsuleName || "Untitled capsule"}</p>
      </div>

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
          rows={6}
          className="w-full resize-none rounded-2xl border border-border bg-surface2 px-4 py-3.5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-muted focus:border-accent/50"
          autoFocus
        />
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface2 transition-transform active:scale-[0.98]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-plum/40">
            <span className="text-lg text-accent">+</span>
          </div>
          <p className="text-sm text-muted">Tap to choose a photo</p>
          <p className="text-xs text-muted/50">Coming soon in v1</p>
        </div>
      )}

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Your contribution is hidden from the circle until the capsule opens.
        They&apos;ll only see that you&apos;ve added something.
      </p>

      <div className="mt-6 pb-8">
        <button
          onClick={onSeal}
          disabled={type === "text" && !text.trim()}
          className="w-full rounded-2xl bg-accent py-4 text-sm font-medium text-bg transition-all active:scale-[0.98] disabled:opacity-30"
        >
          Seal my contribution
        </button>
        <button onClick={onSeal} className="mt-3 w-full py-2 text-sm text-muted">
          Skip for now
        </button>
      </div>
    </>
  );
}
