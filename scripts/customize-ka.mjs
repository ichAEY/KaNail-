import { readFileSync, writeFileSync, appendFileSync } from "node:fs";

const mobilePath = "app/mobile-claytone.tsx";
const layoutPath = "app/layout.tsx";
const tuningPath = "app/site-tuning.css";
const nextConfigPath = "next.config.ts";

let mobile = readFileSync(mobilePath, "utf8");

// Ka Nail has no verified opening-hour interval. Keep the exact TANEM status UI,
// but show only the verified fact instead of inventing hours.
mobile = mobile.replace(
  /const isOpen = minuteOfDay >= 10 \* 60 && minuteOfDay < 22 \* 60;\n\n\s*setOpenStatus\(\{[\s\S]*?\n\s*\}\);/,
  `const isOpen = null;\n\n      setOpenStatus({\n        isOpen,\n        label: "По предварительной записи",\n      });`,
);

// An empty promotions array needs an explicit type for the template's TSX to type-check.
mobile = mobile.replace(
  "const promotions = [];",
  "const promotions: Array<{ title: string; highlight: string; description: string; period: string; image: string; alt: string }> = [];",
);

// Ka Nail has no genuine before/after pair. Keep only the real portfolio in both
// desktop and mobile versions and make the lightbox navigate only through it.
mobile = mobile
  .replace(/<h2>До\s*\/\s*после<\/h2>/g, "<h2>Работы Карины</h2>")
  .replace(/Реальные примеры обработки, формы и покрытия/g, "Реальные фотографии работ Карины")
  .replace("const lightboxItems = [...beforeAfter, ...galleryWorks];", "const lightboxItems = galleryWorks;")
  .replace(/напишите Карине напрямую\./g, "свяжитесь с Кариной напрямую.");

writeFileSync(mobilePath, mobile, "utf8");

// Ka Nail does not have a separate Yandex Metrika counter or Yclients widget.
// Strip Nonna-specific integrations after the template generator has finished.
let layout = readFileSync(layoutPath, "utf8");
layout = layout
  .replace(/const yandexMetrikaCode = `[\s\S]*?`;\n\n/, "")
  .replace(/\n\s*<meta\s+httpEquiv="Content-Security-Policy"[\s\S]*?\/>/, "")
  .replace(/\n\s*<script\s+type="text\/javascript"[\s\S]*?dangerouslySetInnerHTML=\{\{ __html: yandexMetrikaCode \}\}[\s\S]*?\/>/, "")
  .replace(/\n\s*<noscript>[\s\S]*?<\/noscript>/, "")
  .replace(/\n\s*<a\s+id="yclients-booking-proxy"[\s\S]*?\/>/, "")
  .replace(/\n\s*<script src="tanem-metrika-events\.js[^>]*\/>/, "")
  .replace(/\n\s*<script\s+type="text\/javascript"[\s\S]*?src="\/noop\.js"[\s\S]*?\/>/, "");
writeFileSync(layoutPath, layout, "utf8");

// The production site is served from ka-nails.tanem.ru, so assets must resolve from /.
writeFileSync(
  nextConfigPath,
  `import type { NextConfig } from "next";\n\nconst isGitHubPages = process.env.GITHUB_ACTIONS === "true";\n\nconst nextConfig: NextConfig = {\n  ...(isGitHubPages\n    ? {\n        output: "export",\n        trailingSlash: true,\n        images: { unoptimized: true },\n      }\n    : {}),\n};\n\nexport default nextConfig;\n`,
  "utf8",
);

appendFileSync(
  tuningPath,
  `\n\n/* Ka Nail: only blocks and contacts backed by verified customer data stay visible. */\n.mct-promotions,\na[href="#mobile-promotions"],\na.mct-final-secondary[href=""],\na.dct-top-icon[href=""],\n.mct-ba-stage,\n.mct-gallery-content > h3:first-of-type,\n.mct-gallery-ba,\n.mct-ba-labels {\n  display: none !important;\n}\n\n.mct-final-contact-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n}\n\n/* Keep the mobile intro typography stable on iOS: no synthetic bold switch while the font settles. */\n@media (max-width: 767px) {\n  .mct-intro-mark span {\n    font-family: "Cormorant Garamond", Georgia, serif !important;\n    font-weight: 500 !important;\n    font-style: normal !important;\n    font-synthesis: none !important;\n    font-variation-settings: "wght" 500;\n    -webkit-font-smoothing: antialiased;\n    text-rendering: geometricPrecision;\n  }\n\n  .mct-intro-mark small {\n    font-weight: 600 !important;\n    font-synthesis: none !important;\n    -webkit-font-smoothing: antialiased;\n  }\n}\n`,
  "utf8",
);

console.log("Ka Nail customer-specific template cleanup applied.");
