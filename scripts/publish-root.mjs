import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const generatedPaths = [
  'archives',
  'research',
  'tags',
  'page',
  '_astro',
  'index.html',
  '404.html',
  'rss.xml',
  'main.0cf68a.css',
  'main.0cf68a.js',
  'mobile.992cbe.js',
  'slider.e37972.js'
];

async function removeHtmlFiles(relativeDirectory) {
  const directory = path.join(root, relativeDirectory);
  let entries;

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await removeHtmlFiles(path.relative(root, entryPath));
    } else if (entry.name.endsWith('.html')) {
      await fs.rm(entryPath, { force: true });
    }
  }
}

async function copyRecursive(source, target) {
  const stat = await fs.stat(source);

  if (stat.isDirectory()) {
    await fs.mkdir(target, { recursive: true });
    const entries = await fs.readdir(source);
    for (const entry of entries) {
      await copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

async function publish() {
  await fs.access(dist);

  await removeHtmlFiles('2019');
  await removeHtmlFiles('2020');

  for (const relativePath of generatedPaths) {
    await fs.rm(path.join(root, relativePath), { recursive: true, force: true });
  }

  const entries = await fs.readdir(dist);
  for (const entry of entries) {
    await copyRecursive(path.join(dist, entry), path.join(root, entry));
  }

  console.log('Published dist/ to repository root.');
}

publish().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
