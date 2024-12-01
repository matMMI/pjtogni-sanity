import sharp from "sharp";
import path from "path";
import fs from "fs";

const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512];

async function generateIcons() {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const outputDir = path.join(process.cwd(), "public", "icons");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const size of sizes) {
    await sharp(logoPath)
      .resize(size, size)
      .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
  }

  await sharp(logoPath)
    .resize(16, 16)
    .toFile(path.join(outputDir, "favicon-16x16.png"));

  await sharp(logoPath)
    .resize(32, 32)
    .toFile(path.join(outputDir, "favicon-32x32.png"));
}

generateIcons().catch(console.error);
