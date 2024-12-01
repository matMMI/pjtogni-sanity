import sharp from "sharp";
import path from "path";
import fs from "fs";

const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512];

async function generateIcons() {
  const logoPath = path.join(process.cwd(), "public", "logo.png"); // Your original logo
  const outputDir = path.join(process.cwd(), "public", "icons");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Generate icons for each size
  for (const size of sizes) {
    await sharp(logoPath)
      .resize(size, size)
      .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
  }

  // Generate favicon.ico (contains multiple sizes)
  await sharp(logoPath)
    .resize(32, 32)
    .toFile(path.join(process.cwd(), "public", "favicon.ico"));
}

generateIcons().catch(console.error);
