// Keep the original photograph outside the small landmark region, including the fisherman, boat, sun and sky.
import sharp from "sharp";
const region = { left: 1445, top: 315, width: 227, height: 225 };
const patch = await sharp("assets/source/pesca-landmark-edit.png")
  .extract(region)
  .toBuffer();
const mask = Buffer.from(
  `<svg width="227" height="225"><defs><filter id="feather"><feGaussianBlur stdDeviation="5"/></filter></defs><rect x="9" y="9" width="218" height="207" fill="white" filter="url(#feather)"/></svg>`,
);
const blended = await sharp(patch)
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();
await sharp("assets/source/pesca.jpg")
  .composite([{ input: blended, left: region.left, top: region.top }])
  .png()
  .toFile("assets/source/pesca.png");
