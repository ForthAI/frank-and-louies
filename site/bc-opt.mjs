import sharp from "sharp";
const V = "brand-assets/cutout-masters/Buttercakes/Vanilla Buttercake";
const out = "public/photos/cutouts";
const CW = 1400, CH = 1080, CAKEW = 1300, BOTTOM = 40;

async function place(src, name) {
  // trim transparent edges, scale cake to common width, bottom-align on a fixed canvas
  const trimmed = await sharp(src).trim({ threshold: 10 }).resize({ width: CAKEW }).png().toBuffer();
  const m = await sharp(trimmed).metadata();
  const left = Math.round((CW - CAKEW) / 2);
  const top = CH - BOTTOM - m.height;
  const buf = await sharp({ create: { width: CW, height: CH, channels: 4, background: { r:0,g:0,b:0,alpha:0 } } })
    .composite([{ input: trimmed, left, top }])
    .webp({ quality: 84 }).toBuffer();
  await sharp(buf).toFile(`${out}/${name}.webp`);
  console.log(name, CW + "x" + CH, "cakeH=" + m.height, Math.round(buf.length/1024) + "KB");
  return buf;
}
const whole = await place(`${V}/F_L-097.png`, "buttercake-whole");
const cut   = await place(`${V}/F_L-046.png`, "buttercake-cut");

const flat = b => sharp(b).flatten({ background:{r:255,g:255,b:255} });
const cut50 = await sharp(await flat(cut).png().toBuffer()).ensureAlpha(0.5).png().toBuffer();
await flat(whole).composite([{ input: cut50 }]).resize({width:900}).jpeg({ quality: 88 })
  .toFile("/private/tmp/claude-501/-Users-matthewsnyder-Documents-Claude-Projects-Frank---Louie-s/464f718c-0293-47ff-a38b-b178772b75ef/scratchpad/bc-blend2.jpg");
console.log("blend2 written");
