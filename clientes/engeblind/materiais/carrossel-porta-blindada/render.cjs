// Gera os PNGs 1080x1350 do carrossel a partir do index.html.
// Uso: node marketing/carrossel-porta-blindada/render.cjs
const { chromium } = require("playwright");
const path = require("node:path");
const fs = require("node:fs");

const dir = __dirname;
const out = path.join(dir, "slides");
fs.mkdirSync(out, { recursive: true });

(async () => {
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1400 }, deviceScaleFactor: 1 });
await page.goto("file://" + path.join(dir, "index.html"), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const slides = await page.locator(".slide").all();
for (const [i, slide] of slides.entries()) {
  const file = path.join(out, `${String(i + 1).padStart(2, "0")}.png`);
  await slide.screenshot({ path: file });
  console.log(file);
}
await browser.close();
})();
