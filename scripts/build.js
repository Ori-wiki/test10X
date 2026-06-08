const { cpSync, copyFileSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const rootDirectory = join(__dirname, "..");
const outputDirectory = join(rootDirectory, "dist");

mkdirSync(join(outputDirectory, "scripts"), { recursive: true });
copyFileSync(join(rootDirectory, "index.html"), join(outputDirectory, "index.html"));
copyFileSync(join(rootDirectory, "scripts", "script.js"), join(outputDirectory, "scripts", "script.js"));
cpSync(join(rootDirectory, "images"), join(outputDirectory, "images"), { recursive: true });
