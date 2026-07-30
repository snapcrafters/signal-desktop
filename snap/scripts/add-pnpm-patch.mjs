import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const signalRoot = process.cwd();
const workspacePath = path.join(signalRoot, "pnpm-workspace.yaml");
const extraPatch = {
  key: "fs-extra@11.3.4",
  packageName: "fs-extra",
  path: "patches/fs-extra+11.3.4.patch",
};

if (!existsSync(workspacePath)) {
  throw new Error(
    `Expected ${workspacePath} to exist. Has Signal's workspace layout changed?`,
  );
}

const original = readFileSync(workspacePath, "utf8");
const headers = [...original.matchAll(/^patchedDependencies[ \t]*:[ \t]*$/gm)];

if (headers.length !== 1) {
  throw new Error(
    `Expected exactly one top-level patchedDependencies block in ${workspacePath}; found ${headers.length}.`,
  );
}

const blockStart = headers[0].index + headers[0][0].length;
const blockLines = original.slice(blockStart).split("\n");

for (const line of blockLines) {
  if (line.trim() === "") {
    continue;
  }
  if (!/^\s/.test(line)) {
    break;
  }

  const entry = line.match(/^\s+(?:(['"])(.*?)\1|([^#'"][^:#]*?))[ \t]*:/);
  if (!entry) {
    continue;
  }

  const key = (entry[2] ?? entry[3]).trim();
  const separator = key.lastIndexOf("@");
  const packageName = separator > 0 ? key.slice(0, separator) : key;

  if (packageName === extraPatch.packageName) {
    throw new Error(
      `${workspacePath} already patches ${extraPatch.packageName}. ` +
        "Reconcile Signal's patch with the Snap patch instead of duplicating it.",
    );
  }
}

const patchPath = path.join(signalRoot, extraPatch.path);
if (!existsSync(patchPath)) {
  throw new Error(`Expected Snap patch ${patchPath} to exist.`);
}

const entry = `\n  '${extraPatch.key}': '${extraPatch.path}'`;
const merged =
  original.slice(0, blockStart) + entry + original.slice(blockStart);

writeFileSync(workspacePath, merged, "utf8");
console.log(`Registered ${extraPatch.key} in ${workspacePath}`);
