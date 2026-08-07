/**
 * Technology stack logos — Figma 508:66.
 *
 * Extracted from the artboard rather than transcribed: every tile is a 167x88
 * white card holding a logo, grouped under the section heading above it.
 * w/h are the authored logo dimensions — they vary per logo and are what keeps
 * each mark at its intended optical size inside a uniform tile.
 *
 * Section headings live in the dictionaries; only structure is here.
 */

export type TechLogo = { file: string; w: number; h: number };
export type TechSection = { id: string; logos: readonly TechLogo[] };

export const TECH_TILE = { width: 167, height: 88 } as const;

export const TECH_SECTIONS: readonly TechSection[] = [
  {
    id: "ai",
    logos: [
      { file: "/tech/tech-ai-01.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-02.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-03.png", w: 140, h: 80 },
      { file: "/tech/tech-ai-04.png", w: 140, h: 80 },
      { file: "/tech/tech-ai-05.png", w: 140, h: 80 },
      { file: "/tech/tech-ai-06.png", w: 140, h: 80 },
      { file: "/tech/tech-ai-07.jpg", w: 140, h: 80 },
      { file: "/tech/tech-ai-08.jpg", w: 140, h: 75 },
      { file: "/tech/tech-ai-09.jpg", w: 140, h: 75 },
      { file: "/tech/tech-ai-10.jpg", w: 140, h: 70 },
      { file: "/tech/tech-ai-11.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-12.jpg", w: 142, h: 30 },
      { file: "/tech/tech-ai-13.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-14.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-15.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-16.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-17.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-18.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-19.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-20.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-21.png", w: 140, h: 48 },
      { file: "/tech/tech-ai-22.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-23.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-24.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-25.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-26.png", w: 140, h: 71 },
      { file: "/tech/tech-ai-27.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-28.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-29.png", w: 140, h: 79 },
      { file: "/tech/tech-ai-30.png", w: 140, h: 79 },
    ],
  },
  {
    id: "backend",
    logos: [
      { file: "/tech/tech-backend-01.png", w: 140, h: 78 },
      { file: "/tech/tech-backend-02.png", w: 140, h: 89 },
      { file: "/tech/tech-ai-21.png", w: 140, h: 48 },
      { file: "/tech/tech-backend-04.png", w: 140, h: 85 },
      { file: "/tech/tech-backend-05.jpg", w: 140, h: 75 },
      { file: "/tech/tech-backend-06.png", w: 140, h: 23 },
      { file: "/tech/tech-backend-07.png", w: 140, h: 71 },
      { file: "/tech/tech-backend-08.png", w: 140, h: 54 },
    ],
  },
  {
    id: "frontend",
    logos: [
      { file: "/tech/tech-frontend-01.png", w: 140, h: 35 },
      { file: "/tech/tech-frontend-02.png", w: 140, h: 78 },
      { file: "/tech/tech-frontend-03.jpg", w: 83, h: 80 },
      { file: "/tech/tech-frontend-04.png", w: 140, h: 39 },
      { file: "/tech/tech-frontend-05.png", w: 140, h: 85 },
    ],
  },
  {
    id: "app",
    logos: [
      { file: "/tech/tech-app-01.png", w: 140, h: 65 },
      { file: "/tech/tech-app-02.png", w: 140, h: 79 },
      { file: "/tech/tech-app-03.png", w: 140, h: 23 },
      { file: "/tech/tech-app-04.png", w: 140, h: 67 },
      { file: "/tech/tech-app-05.png", w: 140, h: 59 },
    ],
  },
  {
    id: "devops",
    logos: [
      { file: "/tech/tech-devops-01.png", w: 140, h: 75 },
      { file: "/tech/tech-devops-02.png", w: 140, h: 72 },
      { file: "/tech/tech-devops-03.png", w: 140, h: 79 },
      { file: "/tech/tech-devops-04.png", w: 140, h: 72 },
      { file: "/tech/tech-devops-05.png", w: 140, h: 36 },
      { file: "/tech/tech-devops-06.png", w: 140, h: 31 },
      { file: "/tech/tech-devops-07.png", w: 140, h: 66 },
      { file: "/tech/tech-devops-08.png", w: 140, h: 71 },
    ],
  },
  {
    id: "cloud",
    logos: [
      { file: "/tech/tech-cloud-01.png", w: 140, h: 84 },
      { file: "/tech/tech-cloud-02.png", w: 140, h: 36 },
      { file: "/tech/tech-cloud-03.png", w: 140, h: 41 },
    ],
  },
];
