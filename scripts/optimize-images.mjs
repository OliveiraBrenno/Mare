import sharp from "sharp";
import { mkdir, stat, rename } from "node:fs/promises";
const assets = {
  pesca: ["png", [800, 1600]],
  oceano: ["jpg", [800, 1600]],
  cozinheiro: ["jpg", [480, 960]],
  varanda: ["jpg", [800, 1600]],
  ceviche: ["jpg", [400, 800]],
  camarao: ["jpg", [400, 800]],
  peixe: ["jpg", [400, 800]],
  polvo: ["jpg", [400, 800]],
  coral: ["png", [320, 640]],
  "prato-recortado": ["png", [640, 1000]],
};
await mkdir("assets/source", { recursive: true });
for (const [name, [extension, widths]] of Object.entries(assets)) {
  let source = `assets/source/${name}.${extension}`;
  try {
    await stat(source);
  } catch {
    await rename(`public/${name}.${extension}`, source);
  }
  for (const width of widths)
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90, effort: 5 })
      .toFile(`public/${name}-${width}.webp`);
}
