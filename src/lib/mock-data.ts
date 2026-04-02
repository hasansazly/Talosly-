export const mockUser = {
  id: "user-1",
  name: "Maya",
  initials: "M",
  avatarColor: "bg-plum",
};

export const mockCircles = [
  { id: "c1", name: "Chicago crew", memberCount: 5, lastCheckin: "2h ago" },
  { id: "c2", name: "Family", memberCount: 4, lastCheckin: "1d ago" },
  { id: "c3", name: "Jordan & me", memberCount: 2, lastCheckin: "3h ago" },
];

export const mockMembers = [
  { id: "u1", name: "Maya", initials: "M", color: "bg-plum" },
  { id: "u2", name: "Jamie", initials: "J", color: "bg-accent-dim" },
  { id: "u3", name: "Priya", initials: "P", color: "bg-success" },
  { id: "u4", name: "Ryan", initials: "R", color: "bg-surface2" },
  { id: "u5", name: "Dev", initials: "D", color: "bg-plum" },
];

export const mockCheckins = [
  {
    id: "ci1",
    author: mockMembers[0],
    body: "Finally made it through the week. First time I've seen sunshine in four days. Miss you all.",
    timestamp: "2h ago",
    reactions: [{ emoji: "🤍", count: 3, reacted: false }],
    unread: true,
  },
  {
    id: "ci2",
    author: mockMembers[1],
    body: "Can't wait for April. Already planning what we're eating first.",
    timestamp: "5h ago",
    reactions: [{ emoji: "🤍", count: 4, reacted: true }],
    unread: false,
  },
  {
    id: "ci3",
    author: mockMembers[2],
    body: "Had the strangest dream about our road trip. Woke up laughing.",
    timestamp: "yesterday",
    reactions: [
      { emoji: "😂", count: 2, reacted: false },
      { emoji: "🤍", count: 1, reacted: false },
    ],
    unread: false,
  },
];

export const mockMemories = [
  {
    id: "m1",
    body: "That rooftop in Wicker Park where we decided to do the road trip. Best bad idea we ever had.",
    date: "Aug 2022",
    author: mockMembers[0],
    hasImage: false,
    gradient: "from-plum/60 to-surface",
  },
  {
    id: "m2",
    body: "Jamie's terrible birthday cake that somehow tasted amazing.",
    date: "Mar 2023",
    author: mockMembers[1],
    hasImage: true,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: "m3",
    body: "The night we stayed up until 4am just talking. Nothing happened and everything happened.",
    date: "Dec 2022",
    author: mockMembers[2],
    hasImage: false,
    gradient: "from-accent-dim/40 to-surface",
  },
  {
    id: "m4",
    body: null,
    date: "Jun 2023",
    author: mockMembers[3],
    hasImage: true,
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
  },
];

export const mockEvents = [
  {
    id: "e1",
    title: "Jamie visits Chicago",
    date: "2025-04-18",
    month: "Apr",
    day: "18",
    daysUntil: 18,
    going: 3,
  },
  {
    id: "e2",
    title: "Priya's birthday",
    date: "2025-05-02",
    month: "May",
    day: "02",
    daysUntil: 32,
    going: 5,
  },
  {
    id: "e3",
    title: "Summer reunion",
    date: "2025-07-12",
    month: "Jul",
    day: "12",
    daysUntil: 103,
    going: 2,
  },
];

export const mockInvite = {
  code: "abc123",
  circleName: "The Chicago crew",
  invitedBy: "Maya",
  memberCount: 3,
  previewCheckin: {
    author: mockMembers[0],
    body: "Finally made it through the week. Miss you all.",
    timestamp: "2h ago",
  },
};

export type CanvasStatus = "open" | "sealing" | "sealed";

export interface CanvasContribution {
  id: string;
  author: (typeof mockMembers)[0];
  type: "photo" | "quote";
  content?: string;
  imageUrl?: string;
  day: string;
  addedAt: string;
}

export interface WeeklyCanvas {
  id: string;
  circleId: string;
  status: CanvasStatus;
  chapterNumber: number;
  weekLabel: string;
  opensAt: string;
  sealsAt: string;
  contributions: CanvasContribution[];
  allMembers: typeof mockMembers;
  sealedAt?: string;
  hoursUntilSeal?: number;
  contributorCount: number;
}

export const mockActiveCanvas: WeeklyCanvas = {
  id: "canvas-week-14",
  circleId: "c1",
  status: "open",
  chapterNumber: 14,
  weekLabel: "Week of Apr 7",
  opensAt: "2025-04-07T00:00:00Z",
  sealsAt: "2025-04-13T23:59:59Z",
  hoursUntilSeal: 96,
  contributions: [
    {
      id: "cv1",
      author: mockMembers[0],
      type: "quote",
      content: "Some walks you just need to take alone.",
      day: "Mon",
      addedAt: "Apr 7",
    },
    {
      id: "cv2",
      author: mockMembers[1],
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
      day: "Tue",
      addedAt: "Apr 8",
    },
    {
      id: "cv3",
      author: mockMembers[2],
      type: "quote",
      content: "Made the soup recipe. It tasted like the trip.",
      day: "Wed",
      addedAt: "Apr 9",
    },
  ],
  allMembers: mockMembers,
  contributorCount: 3,
};

export const mockChapters: WeeklyCanvas[] = [
  {
    id: "canvas-week-13",
    circleId: "c1",
    status: "sealed",
    chapterNumber: 13,
    weekLabel: "Week of Mar 31",
    opensAt: "2025-03-31T00:00:00Z",
    sealsAt: "2025-04-06T23:59:59Z",
    sealedAt: "Apr 6, 2025",
    contributions: [
      {
        id: "cv-13-1",
        author: mockMembers[0],
        type: "quote",
        content: "Finished the book. Cried on the train. Very normal.",
        day: "Mon",
        addedAt: "Mar 31",
      },
      {
        id: "cv-13-2",
        author: mockMembers[1],
        type: "photo",
        imageUrl:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
        day: "Wed",
        addedAt: "Apr 2",
      },
      {
        id: "cv-13-3",
        author: mockMembers[2],
        type: "quote",
        content: "Spring finally showed up. About time.",
        day: "Thu",
        addedAt: "Apr 3",
      },
      {
        id: "cv-13-4",
        author: mockMembers[3],
        type: "photo",
        imageUrl:
          "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&q=80",
        day: "Sat",
        addedAt: "Apr 5",
      },
    ],
    allMembers: mockMembers,
    contributorCount: 4,
  },
  {
    id: "canvas-week-12",
    circleId: "c1",
    status: "sealed",
    chapterNumber: 12,
    weekLabel: "Week of Mar 24",
    opensAt: "2025-03-24T00:00:00Z",
    sealsAt: "2025-03-30T23:59:59Z",
    sealedAt: "Mar 30, 2025",
    contributions: [
      {
        id: "cv-12-1",
        author: mockMembers[0],
        type: "photo",
        imageUrl:
          "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=400&q=80",
        day: "Tue",
        addedAt: "Mar 25",
      },
      {
        id: "cv-12-2",
        author: mockMembers[4],
        type: "quote",
        content:
          "The thing about good friends is you pick up exactly where you left off.",
        day: "Fri",
        addedAt: "Mar 28",
      },
    ],
    allMembers: mockMembers,
    contributorCount: 2,
  },
  {
    id: "canvas-week-11",
    circleId: "c1",
    status: "sealed",
    chapterNumber: 11,
    weekLabel: "Week of Mar 17",
    opensAt: "2025-03-17T00:00:00Z",
    sealsAt: "2025-03-23T23:59:59Z",
    sealedAt: "Mar 23, 2025",
    contributions: [
      {
        id: "cv-11-1",
        author: mockMembers[1],
        type: "quote",
        content:
          "Spent the whole day doing nothing and it was exactly what I needed.",
        day: "Sun",
        addedAt: "Mar 23",
      },
      {
        id: "cv-11-2",
        author: mockMembers[2],
        type: "photo",
        imageUrl:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
        day: "Wed",
        addedAt: "Mar 19",
      },
      {
        id: "cv-11-3",
        author: mockMembers[3],
        type: "quote",
        content:
          "Called my mom for an hour. Realized I needed that more than she did.",
        day: "Thu",
        addedAt: "Mar 20",
      },
      {
        id: "cv-11-4",
        author: mockMembers[4],
        type: "photo",
        imageUrl:
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=80",
        day: "Fri",
        addedAt: "Mar 21",
      },
    ],
    allMembers: mockMembers,
    contributorCount: 4,
  },
];

export type CapsuleStatus = "collecting" | "sealed" | "unlocked";
export type TriggerType = "date" | "event" | "circle";
export type ContentType = "text" | "photo" | "voice";

export interface CapsuleContribution {
  id: string;
  author: (typeof mockMembers)[number];
  type: ContentType;
  text?: string;
  imageUrl?: string;
  addedAt: string;
}

export interface TimeCapsule {
  id: string;
  name: string;
  createdBy: (typeof mockMembers)[number];
  status: CapsuleStatus;
  triggerType: TriggerType;
  unlockDate?: string;
  triggerLabel?: string;
  collectDeadline: string;
  contributions: CapsuleContribution[];
  allMembers: typeof mockMembers;
  sealedAt?: string;
  unlockedAt?: string;
  daysUntilUnlock?: number;
  progressPercent?: number;
}

export const mockCapsules: TimeCapsule[] = [
  {
    id: "cap1",
    name: "Before Jamie moves to London",
    createdBy: mockMembers[0],
    status: "collecting",
    triggerType: "date",
    unlockDate: "2026-01-01",
    collectDeadline: "2025-04-07",
    contributions: [
      {
        id: "cc1",
        author: mockMembers[0],
        type: "text",
        text: "I keep thinking about that last night we all stayed up until sunrise. I want future-us to remember how it felt before everything changed.",
        addedAt: "Apr 1",
      },
      {
        id: "cc2",
        author: mockMembers[2],
        type: "photo",
        imageUrl:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
        addedAt: "Apr 2",
      },
    ],
    allMembers: mockMembers,
    daysUntilUnlock: 275,
    progressPercent: 8,
  },
  {
    id: "cap2",
    name: "For Priya's graduation",
    createdBy: mockMembers[1],
    status: "sealed",
    triggerType: "event",
    triggerLabel: "When Priya graduates",
    collectDeadline: "2025-03-15",
    sealedAt: "Mar 15, 2025",
    contributions: [
      {
        id: "cc3",
        author: mockMembers[1],
        type: "text",
        text: "placeholder — hidden until open",
        addedAt: "Mar 10",
      },
      {
        id: "cc4",
        author: mockMembers[2],
        type: "text",
        text: "placeholder — hidden until open",
        addedAt: "Mar 12",
      },
      {
        id: "cc5",
        author: mockMembers[3],
        type: "photo",
        imageUrl: "",
        addedAt: "Mar 14",
      },
    ],
    allMembers: mockMembers,
    daysUntilUnlock: 45,
    progressPercent: 62,
  },
  {
    id: "cap3",
    name: "Summer reunion — one year later",
    createdBy: mockMembers[0],
    status: "unlocked",
    triggerType: "date",
    unlockDate: "2025-03-28",
    collectDeadline: "2024-09-01",
    sealedAt: "Sep 1, 2024",
    unlockedAt: "Mar 28, 2025",
    contributions: [
      {
        id: "cc6",
        author: mockMembers[0],
        type: "text",
        text: "If you're reading this, we actually did it. We stayed close even after everything. I'm so proud of us.",
        addedAt: "Aug 28",
      },
      {
        id: "cc7",
        author: mockMembers[1],
        type: "text",
        text: "Hey future Jamie. I hope the thing you were scared about turned out okay. It always does.",
        addedAt: "Aug 29",
      },
      {
        id: "cc8",
        author: mockMembers[2],
        type: "photo",
        imageUrl:
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
        addedAt: "Aug 30",
      },
      {
        id: "cc9",
        author: mockMembers[3],
        type: "text",
        text: "I added this at 2am and I don't remember what I wrote but I hope it's good.",
        addedAt: "Aug 31",
      },
    ],
    allMembers: mockMembers,
    progressPercent: 100,
  },
];

export interface Echo {
  id: string;
  circleId: string;
  sourceType: "checkin" | "memory" | "canvas";
  author: (typeof mockMembers)[0];
  content?: string;
  imageUrl?: string;
  originalDate: string;
  yearsAgo: number;
  prompt: string;
  reactions: { emoji: string; count: number; reacted: boolean }[];
  dismissed: boolean;
}

export const mockEchoes: Echo[] = [
  {
    id: "echo1",
    circleId: "c1",
    sourceType: "checkin",
    author: mockMembers[2],
    content:
      "Just got off a 6-hour drive and all I could think about was how much I wished you guys were in the car.",
    originalDate: "Mar 29, 2024",
    yearsAgo: 1,
    prompt: "One year ago.",
    reactions: [
      { emoji: "🥹", count: 3, reacted: false },
      { emoji: "🤍", count: 4, reacted: true },
    ],
    dismissed: false,
  },
  {
    id: "echo2",
    circleId: "c2",
    sourceType: "memory",
    author: mockMembers[0],
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    originalDate: "Aug 14, 2023",
    yearsAgo: 2,
    prompt: "Remember this?",
    reactions: [
      { emoji: "😂", count: 2, reacted: false },
      { emoji: "🤍", count: 5, reacted: false },
    ],
    dismissed: false,
  },
];
