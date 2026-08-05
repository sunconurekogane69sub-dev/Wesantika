/**
 * Locale-independent structure: geometry, icons, links.
 * Every user-visible string lives in src/lib/i18n/dictionaries/* keyed by the
 * ids below. Figma node ids are kept in comments so anything can be traced back.
 */

export const NAV_ITEMS = [
  { id: "top", href: "/" },
  { id: "solution", href: null }, // not designed yet
  { id: "about", href: "/about" },
  { id: "work", href: null }, // not designed yet
  { id: "newsroom", href: null }, // not designed yet
  { id: "blog", href: null }, // not designed yet
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

/** Left rail of the services section — Figma 180:624-629 */
export const SERVICE_CATEGORY_IDS = [
  "custom",
  "offshore",
  "ai",
  "qa",
  "infrastructure",
  "hire",
] as const;

export type ServiceCategoryId = (typeof SERVICE_CATEGORY_IDS)[number];

/** 11 cards, row-major so reading order matches the 2-column grid. */
export const SERVICE_CARDS = [
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
] as const;

export type ServiceCardId = (typeof SERVICE_CARDS)[number]["id"];

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

/** About Us narrative blocks — Figma 210:979-994 */
export const ABOUT_BLOCK_IDS = [
  "tomorrow",
  "confidence",
  "purpose",
  "partnership",
  "talent",
] as const;

export type AboutBlockId = (typeof ABOUT_BLOCK_IDS)[number];
