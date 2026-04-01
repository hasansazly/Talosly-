"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { mockCapsules } from "@/lib/mock-data";
import { CapsuleUnlockedView } from "@/components/capsule/CapsuleViews";

export default function CapsuleOpenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const capsule = mockCapsules.find((c) => c.id === id);

  if (!capsule) notFound();

  return <CapsuleUnlockedView capsule={capsule} />;
}
