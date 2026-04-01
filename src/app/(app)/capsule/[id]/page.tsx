"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { mockCapsules } from "@/lib/mock-data";
import {
  CapsuleCollectingView,
  CapsuleSealedView,
  CapsuleUnlockedView,
} from "@/components/capsule/CapsuleViews";

export default function CapsuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const capsule = mockCapsules.find((c) => c.id === id);

  if (!capsule) notFound();

  if (capsule.status === "collecting") return <CapsuleCollectingView capsule={capsule} />;
  if (capsule.status === "sealed") return <CapsuleSealedView capsule={capsule} />;
  return <CapsuleUnlockedView capsule={capsule} />;
}
