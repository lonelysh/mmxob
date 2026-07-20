import { readFileSync, writeFileSync, existsSync } from "fs";

const target = process.argv[2] ?? "0.0.1";
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = target;
writeFileSync("manifest.json", JSON.stringify(manifest, null, 2) + "\n");

const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[target] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, 2) + "\n");

// Keep package.json in sync so tooling that reads it (release badges, npm
// scripts, CI) sees the same version that's actually shipping. npm version
// rewrites package.json itself, but plain `node version-bump.mjs X` calls do
// not, which left the file stuck at 0.1.7 while manifest.json kept moving.
if (existsSync("package.json")) {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  if (pkg.version !== target) {
    pkg.version = target;
    writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
  }
}