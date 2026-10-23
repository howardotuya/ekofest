// Copy from the Figma file (Xa7M6UgrIixgnPLXosVhbq). Desktop copy is used at
// every size; the mobile frame only changes layout and decoration.

/** Gates open on the first night: 12 December 2026, 16:00 in Lagos (WAT, UTC+1). */
export const OPENS_AT = Date.UTC(2026, 11, 12, 15, 0, 0);

export type Tone = "yellow" | "violet" | "pink" | "mint" | "muted";

export const nav = [
  { label: "Line-up", href: "#line-up" },
  { label: "Schedule", href: "#schedule" },
  { label: "Tickets", href: "#tickets" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faq" },
] as const;

export const marquee = ["Èkó Fest 2026", "12–14 December", "Lagos"];

export const hero = {
  lines: ["Lagos will be", "the loudest", "city on earth"],
  description:
    "Three nights of Afrobeats, Alté and Amapiano at Tafawa Balewa Square. Brought to you by Èkó Sound.",
  cta: { label: "Get tickets", from: "From ₦25,000", href: "#tickets" },
};

export const countdownUnits = ["Days", "Hours", "Minutes", "Seconds"] as const;

export const ribbons = {
  tagline: "The best nights of the year",
  artists: ["Àdùnní", "Bayo Kaze", "Ifé", "Deji Wave"],
};

export const lineup = {
  eyebrow: "True talent",
  title: "Meet the line-up",
  artists: [
    { name: "Àdùnní", genre: "Afro-soul", note: "Headliner, Friday", tone: "yellow", set: "fri-headliner" },
    { name: "Bayo Kaze", genre: "Afrobeats", note: "Headliner, Saturday", tone: "violet", set: "sat-headliner" },
    { name: "Ifé", genre: "Alté", note: "Sunday", tone: "pink", set: "sun-ife" },
    { name: "Deji Wave", genre: "Amapiano", note: "Sunday closer", tone: "mint", set: "sun-headliner" },
    { name: "+ 12 special guests", genre: null, note: "To be announced in November", tone: "muted", set: null },
  ],
} satisfies {
  eyebrow: string;
  title: string;
  artists: { name: string; genre: string | null; note: string; tone: Tone; set: string | null }[];
};

export const partners = {
  title: "Made possible by",
  names: [
    "Èkó Sound",
    "Lagos Live",
    "Nkem Pay",
    "Kòbò",
    "Island FM",
    "Bùkà",
    "Tide Radio",
    "Kaba Studios",
  ],
};

export type Slot = { id?: string; time: string; act: string };
export type Night = {
  stop: string;
  day: string;
  date: string;
  tone: Exclude<Tone, "mint" | "muted">;
  sets: Slot[];
};

export const route = {
  eyebrow: "Three nights",
  title: "The route",
  intro: "Follow the road. Gates open at 4pm every night.",
  finish: "Finish",
  nights: [
    {
      stop: "01",
      day: "Fri",
      date: "12 Dec",
      tone: "yellow",
      sets: [
        { time: "4PM", act: "Gates open" },
        { time: "6PM", act: "Ifé" },
        { time: "8PM", act: "Deji Wave" },
        { id: "fri-headliner", time: "10PM", act: "Àdùnní" },
      ],
    },
    {
      stop: "02",
      day: "Sat",
      date: "13 Dec",
      tone: "violet",
      sets: [
        { time: "4PM", act: "Gates open" },
        { time: "6PM", act: "DJ Tunde" },
        { time: "8PM", act: "Guest set" },
        { id: "sat-headliner", time: "10PM", act: "Bayo Kaze" },
      ],
    },
    {
      stop: "03",
      day: "Sun",
      date: "14 Dec",
      tone: "pink",
      sets: [
        { time: "4PM", act: "Gates open" },
        { time: "6PM", act: "Kaba Band" },
        { id: "sun-ife", time: "8PM", act: "Ifé + friends" },
        { id: "sun-headliner", time: "11PM", act: "Deji Wave" },
      ],
    },
  ] satisfies Night[],
};

export type Ticket = {
  id: "general" | "vip" | "backstage";
  name: string;
  note: string;
  price: number;
  perks: string[];
  tone: "mint" | "violet" | "pink";
};

export const tickets = {
  eyebrow: "Pick your pass",
  title: "Tickets",
  passes: [
    {
      id: "general",
      name: "General",
      note: "One night, any day",
      price: 25_000,
      perks: ["Entry for one night", "Food court access", "Free water refill"],
      tone: "mint",
    },
    {
      id: "vip",
      name: "VIP",
      note: "All three nights",
      price: 85_000,
      perks: ["Fast-lane entry", "Raised viewing deck", "Two free drinks a night", "Merch pack"],
      tone: "violet",
    },
    {
      id: "backstage",
      name: "Backstage",
      note: "All three nights",
      price: 250_000,
      perks: ["Everything in VIP", "Meet the artists", "Backstage lounge", "Parking pass"],
      tone: "pink",
    },
  ] satisfies Ticket[],
};

export const faq = {
  title: "Good to know",
  items: [
    {
      id: "venue",
      q: "Where is it?",
      a: "Tafawa Balewa Square, Lagos Island. Free shuttles run from Lekki and Ikeja.",
    },
    {
      id: "kids",
      q: "Can I bring kids?",
      a: "Under-12s go free on Sunday with an adult. Ear protection at the gate.",
    },
    { id: "pay", q: "How do I pay?", a: "Card, bank transfer or USSD, all through Paystack." },
  ],
};

export const footer = {
  title: ["See you", "in Lagos."],
  dates: "12–14 December 2026",
  place: "Tafawa Balewa Square, Lagos",
  // Instagram has no URL yet, so it renders as plain text.
  links: [...nav, { label: "Instagram", href: null }],
  badge: "Event of the year",
  legal: "A concept project by Howard Otuya. Èkó Fest, its artists and partners are fictional.",
};

const naira = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });
export const formatNaira = (amount: number) => `₦${naira.format(amount)}`;
