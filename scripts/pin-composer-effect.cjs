const fs = require("node:fs");
const path = require("node:path");

const projectRoot = process.cwd();
const packagePath = path.join(projectRoot, "package.json");
const composerEntry = require.resolve("@prisma/composer", { paths: [projectRoot] });

let composerDir = path.dirname(composerEntry);
let composerPackage = null;

while (true) {
  const candidate = path.join(composerDir, "package.json");
  if (fs.existsSync(candidate)) {
    const parsed = JSON.parse(fs.readFileSync(candidate, "utf8"));
    if (parsed.name === "@prisma/composer") {
      composerPackage = parsed;
      break;
    }
  }

  const parent = path.dirname(composerDir);
  if (parent === composerDir) break;
  composerDir = parent;
}

const requiredEffect = composerPackage?.dependencies?.effect;

if (!requiredEffect || typeof requiredEffect !== "string") {
  console.error(
    "[JK CAPITAL] Impossible de lire dependencies.effect dans @prisma/composer/package.json."
  );
  process.exit(1);
}

const projectPackage = JSON.parse(fs.readFileSync(packagePath, "utf8"));
projectPackage.overrides ??= {};

if (projectPackage.overrides.effect !== requiredEffect) {
  projectPackage.overrides.effect = requiredEffect;
  fs.writeFileSync(packagePath, `${JSON.stringify(projectPackage, null, 2)}\\n`);
  console.log(`[JK CAPITAL] Override npm configuré : effect@${requiredEffect}.`);
} else {
  console.log(`[JK CAPITAL] La version effect@${requiredEffect} est déjà alignée sur Composer.`);
}
