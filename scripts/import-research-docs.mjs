import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(root, 'src', 'content', 'research');

const sources = [
  {
    project: 'RocksDB',
    projectSlug: 'rocksdb',
    repo: '/Users/duzhiwang/workspace/cwksp/rocksdb',
    pathPrefix: 'docs/',
    commitLimit: 5,
    include: (file) => file.endsWith('.md')
  },
  {
    project: 'Cassandra',
    projectSlug: 'cassandra',
    repo: '/Users/duzhiwang/workspace/javawksp/cassandra',
    pathPrefix: 'research/',
    commitLimit: 5,
    include: (file) =>
      file.endsWith('.md') &&
      file !== 'research/README.md' &&
      !file.startsWith('research/notes/')
  }
];

function git(repo, args) {
  return execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim();
}

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n/, '').trimStart();
}

function titleFrom(markdown, fallback) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

function descriptionFrom(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#+\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/[`*_#[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

function slugFrom(file) {
  return path.basename(file).replace(/\.(md|markdown)$/i, '');
}

function changedMarkdownFiles(source, commits) {
  const files = new Map();

  for (const commit of commits) {
    const rows = git(source.repo, ['diff-tree', '--no-commit-id', '--name-status', '-r', commit])
      .split('\n')
      .filter(Boolean);
    const date = git(source.repo, ['show', '-s', '--format=%cI', commit]);

    for (const row of rows) {
      const [status, file] = row.split(/\s+/);
      if (!['A', 'M'].includes(status)) continue;
      if (!file.startsWith(source.pathPrefix)) continue;
      if (!source.include(file)) continue;
      if (!files.has(file)) {
        files.set(file, { commit, date, file });
      }
    }
  }

  return [...files.values()];
}

async function importDocs() {
  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });

  const imported = [];

  for (const source of sources) {
    const commits = git(source.repo, [
      'log',
      '--author=duzhiwang',
      `-${source.commitLimit}`,
      '--pretty=format:%H'
    ])
      .split('\n')
      .filter(Boolean);
    const files = changedMarkdownFiles(source, commits);
    const projectOutput = path.join(outputRoot, source.projectSlug);

    await fs.mkdir(projectOutput, { recursive: true });

    for (const item of files) {
      const raw = git(source.repo, ['show', `${item.commit}:${item.file}`]);
      const body = stripFrontmatter(raw);
      const title = titleFrom(body, slugFrom(item.file));
      const description = descriptionFrom(body);
      const slug = slugFrom(item.file);
      const frontmatter = [
        '---',
        `title: ${yamlQuote(title)}`,
        `description: ${yamlQuote(description)}`,
        `date: ${yamlQuote(item.date)}`,
        `project: ${yamlQuote(source.project)}`,
        `projectSlug: ${yamlQuote(source.projectSlug)}`,
        `slug: ${yamlQuote(slug)}`,
        `sourcePath: ${yamlQuote(item.file)}`,
        `sourceCommit: ${yamlQuote(item.commit)}`,
        '---',
        ''
      ].join('\n');

      await fs.writeFile(path.join(projectOutput, `${slug}.md`), `${frontmatter}${body.trim()}\n`);
      imported.push(`${source.project}: ${item.file}`);
    }
  }

  console.log(`Imported ${imported.length} research documents.`);
  for (const item of imported) console.log(`- ${item}`);
}

importDocs().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
