/**
 * Locale-independent structure: geometry, icons, links.
 * Every user-visible string lives in src/lib/i18n/dictionaries/* keyed by the
 * ids below. Figma node ids are kept in comments so anything can be traced back.
 */

export const NAV_ITEMS = [
  { id: "top", href: "/" },
  // "Solution" is the nav entry the Services artboard belongs under; the file
  // has no separate "Services" nav item.
  { id: "solution", href: "/services" },
  { id: "about", href: "/about" },
  { id: "work", href: "/our-work" },
  { id: "technologies", href: "/technologies" },
  { id: "blog", href: "/blog" },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];

/** Right-edge sticky rail — Figma 180:600-622 */
export const CONTACT_CHANNELS = [
  { id: "email", icon: "/icons/icon-mail.svg", href: "mailto:contact@wesantika.example" },
  { id: "telegram", icon: "/icons/icon-telegram.svg", href: "https://t.me/wesantika" },
  { id: "whatsapp", icon: "/icons/icon-whatsapp.svg", href: "https://wa.me/00000000000" },
  { id: "line", icon: "/icons/icon-line.svg", href: "https://line.me/ti/p/~wesantika" },
] as const;

export type ChannelId = (typeof CONTACT_CHANNELS)[number]["id"];

/**
 * Left rail of the services section — Figma 180:624-628.
 *
 * "Hire Developers" (180:629) was dropped on request. The node is still in the
 * Figma file, so re-syncing the rail from Figma would bring it back; the list
 * here is the authority.
 */
export const SERVICE_CATEGORY_IDS = [
  "custom",
  "offshore",
  "ai",
  "qa",
  "infrastructure",
] as const;

export type ServiceCategoryId = (typeof SERVICE_CATEGORY_IDS)[number];

/**
 * One card set per rail category — the rail is a tab list and this is what each
 * tab reveals.
 *
 * `custom` is the 11-card grid drawn in the Top frame (180:630-709). The other
 * four sets were designed off-canvas at x ≈ -1007 (578:472-607) and are keyed
 * to the rail label that sits above each cluster.
 *
 * Card ids are unique across every set so the dictionary can keep one flat
 * `services.cards` map instead of nesting by category.
 */
export const SERVICE_CARD_SETS = {
  custom: [
    { id: "custom", icon: "/icons/icon-custom-software.svg" },
    { id: "web", icon: "/icons/icon-web-app.svg" },
    { id: "mobile", icon: "/icons/icon-mobile-app.svg" },
    { id: "mvp", icon: "/icons/icon-mvp.svg" },
    { id: "legacy", icon: "/icons/icon-legacy.svg" },
    { id: "saas", icon: "/icons/icon-saas.svg" },
    { id: "enterprise", icon: "/icons/icon-enterprise.svg" },
    { id: "backend", icon: "/icons/icon-backend.svg" },
    { id: "frontend", icon: "/icons/icon-frontend.svg" },
    { id: "integration", icon: "/icons/icon-integration.svg" },
    { id: "maintenance", icon: "/icons/icon-maintenance.svg" },
  ],
  offshore: [
    { id: "outsourcing", icon: "/icons/icon-outsourcing.svg" },
    { id: "offshoreTeams", icon: "/icons/icon-offshore.svg" },
  ],
  ai: [
    { id: "aiDevelopment", icon: "/icons/icon-ai-development.svg" },
    { id: "generativeAi", icon: "/icons/icon-generative-ai.svg" },
  ],
  qa: [{ id: "qaTesting", icon: "/icons/icon-qa-testing.svg" }],
  infrastructure: [
    { id: "itServices", icon: "/icons/icon-it-services.svg" },
    { id: "devops", icon: "/icons/icon-devops.svg" },
    { id: "cloudMigration", icon: "/icons/icon-cloud-migration.svg" },
  ],
} as const satisfies Record<
  ServiceCategoryId,
  ReadonlyArray<{ id: string; icon: string }>
>;

export type ServiceCardId =
  (typeof SERVICE_CARD_SETS)[ServiceCategoryId][number]["id"];

/** The AI Innovation panel's own coordinate space — Figma 180:752. */
export const AI_PANEL = { width: 1564, height: 1006 } as const;

/**
 * AI Innovation panel labels — Figma 180:753-761.
 *
 * cx/cy are the label's *centre* in the panel's 1564 x 1006 design space. The
 * whole stage is scaled to fit the viewport, so these stay exact at any width.
 *
 * Positioning is centre-based and every line is `nowrap`: the dictionary supplies
 * each label as an explicit array of lines, so wrapping is deterministic instead
 * of depending on font metrics (which is what pushed "Advanced AI Engineering"
 * onto three lines).
 *
 * `fixed: true` marks the lower-left item, which never reacts to the cursor.
 */
export type AiLabel = {
  id: string;
  cx: number;
  cy: number;
  fontSize: number;
  lineHeight: number;
  fixed?: boolean;
};

export const AI_LABELS: readonly AiLabel[] = [
  { id: "nlp", cx: 685, cy: 146, fontSize: 20, lineHeight: 24 },
  { id: "cv", cx: 1068.5, cy: 177, fontSize: 20, lineHeight: 24 },
  { id: "genai", cx: 401, cy: 340, fontSize: 20, lineHeight: 24 },
  { id: "data", cx: 1151, cy: 388, fontSize: 20, lineHeight: 24 },
  { id: "agentic", cx: 654, cy: 508, fontSize: 20, lineHeight: 24 },
  { id: "erp", cx: 947, cy: 607, fontSize: 20, lineHeight: 24 },
  { id: "predictive", cx: 1150.5, cy: 811, fontSize: 20, lineHeight: 24 },
  { id: "advanced", cx: 229.5, cy: 850, fontSize: 32, lineHeight: 39, fixed: true },
  { id: "mlops", cx: 715, cy: 880, fontSize: 20, lineHeight: 24 },
];

export type AiLabelId = (typeof AI_LABELS)[number]["id"];

/* ---------------------------------------------------------------------------
   Services page — Figma 405:2302 (1672 x 9390)
   --------------------------------------------------------------------------- */

/**
 * Long-form service write-ups — Figma 586:813 and 586:1081.
 *
 * These are the only two topics with material so far. The slug is the URL
 * segment under /services and the id keys into `serviceDetails` in the
 * dictionary; adding a third is a matter of adding a row here plus its copy.
 */
export const SERVICE_DETAIL_TOPICS = [
  { id: "ai", slug: "ai-development" }, // 586:813
  { id: "custom", slug: "custom-software" }, // 586:1081
] as const;

export type ServiceDetailId = (typeof SERVICE_DETAIL_TOPICS)[number]["id"];

export const serviceDetailHref = (locale: string, id: ServiceDetailId) =>
  `/${locale}/services/${
    SERVICE_DETAIL_TOPICS.find((topic) => topic.id === id)!.slug
  }`;

/**
 * Two large cards under the "Accelerate…" heading — Figma 586:1306 / 586:1298.
 * Both were resized from ~497x574 to 420x485 and gained a "DETAIL →" button,
 * which is the entry point to the long-form write-ups above.
 */
export const SERVICE_HIGHLIGHTS = [
  { id: "ai", image: "/images/svc-ai.jpg", detail: "ai" }, // 405:1985
  { id: "custom", image: "/images/svc-legacy.jpg", detail: "custom" }, // 405:1992
] as const satisfies ReadonlyArray<{
  id: string;
  image: string;
  detail: ServiceDetailId;
}>;

export type ServiceHighlightId = (typeof SERVICE_HIGHLIGHTS)[number]["id"];

/**
 * The "Services We Offer" grid — Figma 405:2322 and siblings, 17 cards in a
 * 3-column grid. All 17 are authored now; the empty placeholder slots are gone.
 *
 * `detail` is set only where a write-up actually exists. The file draws a
 * "DETAIL →" button on every card, but 15 of them have nowhere to go, and a
 * button that does nothing is worse than no button — so the two that resolve
 * render it and the rest do not. Fill in `detail` as material arrives.
 *
 * The Web and Mobile illustrations are the only two slots Figma holds as vector
 * groups rather than image fills (405:2002 / 405:2120); they are rebuilt as SVG
 * from the file's own path geometry.
 */
export const SERVICE_OFFER_CARDS = [
  { id: "custom", image: "/images/svc-card-custom-software.png", detail: "custom" },
  { id: "web", image: "/images/svc-card-web-app.svg" },
  { id: "mobile", image: "/images/svc-card-mobile-app.svg" },
  { id: "ai", image: "/images/svc-card-ai-development.png", detail: "ai" },
  { id: "product", image: "/images/svc-card-software-product.png" },
  { id: "enterprise", image: "/images/svc-card-enterprise.png" },
  { id: "saas", image: "/images/svc-card-saas.png" },
  { id: "hire", image: "/images/svc-card-hire-developers.png" },
  { id: "qa", image: "/images/svc-card-qa-testing.png" },
  { id: "integration", image: "/images/svc-card-integration.png" },
  { id: "mvp", image: "/images/svc-card-mvp.png" },
  { id: "poc", image: "/images/svc-card-poc.png" },
  { id: "devops", image: "/images/svc-card-devops.png" },
  { id: "cloud", image: "/images/svc-card-cloud-migration.png" },
  { id: "backend", image: "/images/svc-card-backend.png" },
  { id: "frontend", image: "/images/svc-card-frontend.png" },
  { id: "maintenance", image: "/images/svc-card-maintenance.png" },
] as const satisfies ReadonlyArray<{
  id: string;
  image: string;
  detail?: ServiceDetailId;
}>;

export type ServiceOfferId = (typeof SERVICE_OFFER_CARDS)[number]["id"];

/**
 * "It requires :" points — Figma 405:2291-2293 with their icons.
 * The communication icon is composed from 405:2298 + 405:2299: the group that
 * held them (405:2297) was ungrouped in the file and no longer renders as one.
 */
export const GLOBAL_TEAM_POINTS = [
  { id: "people", icon: "/icons/icon-people.svg", w: 54, h: 48 },
  { id: "communication", icon: "/icons/icon-communication.svg", w: 50, h: 50 },
  { id: "collaboration", icon: "/icons/icon-collaboration.svg", w: 45, h: 53 },
] as const;

export type GlobalTeamPointId = (typeof GLOBAL_TEAM_POINTS)[number]["id"];

/* ---------------------------------------------------------------------------
   Blog

   This page has NO Figma artboard — the file only has the nav entry. Layout and
   structure are designed here against the existing system, and the entries below
   are sample content so the page renders meaningfully.

   Everything user-visible lives in the dictionaries keyed by `slug`, so this
   array is the only thing a CMS would need to replace.
   --------------------------------------------------------------------------- */

export type Article = {
  slug: string;
  /** category id — resolved through the dictionary */
  category: string;
  /** ISO date, formatted per locale at render time */
  date: string;
  image: string;
  /** blog only */
  readMinutes?: number;
};

export const BLOG_CATEGORIES = ["engineering", "ai", "design", "business"] as const;
export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number];

/** Newest first — the first entry renders as the featured post. */
export const BLOG_POSTS: readonly Article[] = [
  {
    slug: "prototype-in-24-hours",
    category: "engineering",
    date: "2026-08-01",
    image: "/images/rfp-visual.png",
    readMinutes: 6,
  },
  {
    slug: "llmops-in-production",
    category: "ai",
    date: "2026-07-21",
    image: "/images/ai-panel.png",
    readMinutes: 9,
  },
  {
    slug: "legacy-without-freezing",
    category: "engineering",
    date: "2026-07-08",
    image: "/images/svc-legacy.jpg",
    readMinutes: 7,
  },
  {
    slug: "designing-for-five-locales",
    category: "design",
    date: "2026-06-24",
    image: "/images/core-values.png",
    readMinutes: 5,
  },
  {
    slug: "offshore-teams-mistakes",
    category: "business",
    date: "2026-06-09",
    image: "/images/svc-global.png",
    readMinutes: 6,
  },
  {
    slug: "retrieval-that-works",
    category: "ai",
    date: "2026-05-27",
    image: "/images/svc-ai.jpg",
    readMinutes: 8,
  },
];

/** About Us narrative blocks — Figma 210:979-994 */
export const ABOUT_BLOCK_IDS = [
  "tomorrow",
  "confidence",
  "purpose",
  "partnership",
  "talent",
] as const;

export type AboutBlockId = (typeof ABOUT_BLOCK_IDS)[number];
