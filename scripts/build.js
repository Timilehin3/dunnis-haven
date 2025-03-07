const fs = require("fs-extra");
const path = require("path");

const srcDir = path.join(__dirname, "../src");
const distDir = path.join(__dirname, "../dist");

async function build() {
  try {
    // Clean dist directory
    await fs.remove(distDir);

    // Copy src to dist
    await fs.copy(srcDir, distDir);

    console.log("Build completed successfully!");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();
