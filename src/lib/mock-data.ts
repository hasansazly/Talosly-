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

export const mockCanvas = {
  weekLabel: "Week of Mar 31",
  endsIn: "4 days",
  frozen: false,
  contributions: [
    {
      id: "cv1",
      author: mockMembers[0],
      type: "quote" as const,
      content: "Some walks you just need to take alone.",
      day: "Mon",
    },
    {
      id: "cv2",
      author: mockMembers[1],
      type: "photo" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
      day: "Tue",
    },
    {
      id: "cv3",
      author: mockMembers[2],
      type: "quote" as const,
      content: "Made the soup recipe. It tasted like the trip.",
      day: "Wed",
    },
  ],
  pendingMembers: [mockMembers[3], mockMembers[4]],
};

export const mockCapsules = [
  {
    id: "cap1",
    from: mockMembers[1],
    lockedUntil: "Apr 18, 2025",
    trigger: "Jamie visits Chicago",
    triggerType: "event" as const,
    daysUntil: 18,
    preview: "A letter + 3 photos",
  },
  {
    id: "cap2",
    from: mockMembers[0],
    lockedUntil: "Oct 1, 2025",
    trigger: "In 6 months",
    triggerType: "date" as const,
    daysUntil: 183,
    preview: "Voice memo · 1m 22s",
  },
];
