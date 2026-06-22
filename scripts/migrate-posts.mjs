import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsDir = path.join(root, 'src', 'content', 'posts');
const contentJsonPath = path.join(root, 'content.json');

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*'
});

turndown.remove(['script', 'style']);

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

function fileNameFor(post) {
  return `${post.path.replace(/\/$/, '').replace(/\//g, '-')}.md`;
}

function descriptionFrom($, entry) {
  return entry
    .text()
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150);
}

function normalizeCodeBlocks($, entry) {
  entry.find('figure.highlight').each((_, element) => {
    const lines = [];
    $(element)
      .find('td.code .line')
      .each((_, line) => {
        lines.push($(line).text());
      });

    const code = lines.length > 0 ? lines.join('\n') : $(element).text();
    const pre = $('<pre><code></code></pre>');
    pre.find('code').text(code);
    $(element).replaceWith(pre);
  });
}

function cleanEntry($, entry) {
  entry.find('.page-reward').remove();
  entry.find('a.headerlink').remove();
  entry.find('h1, h2, h3, h4, h5, h6').each((_, heading) => {
    if (!$(heading).text().trim()) {
      $(heading).remove();
    }
  });
  normalizeCodeBlocks($, entry);
}

function frontmatter(post, description) {
  const tagNames = post.tags.map((tag) => tag.name);
  const tagSlugs = post.tags.map((tag) => tag.slug);
  const legacyPath = post.path.replace(/\/$/, '');

  const lines = [
    '---',
    `title: ${yamlQuote(post.title)}`,
    `date: ${yamlQuote(post.date)}`,
    `description: ${yamlQuote(description)}`,
    `legacyPath: ${yamlQuote(legacyPath)}`,
    'tags:'
  ];

  if (tagNames.length === 0) {
    lines[lines.length - 1] = 'tags: []';
  } else {
    tagNames.forEach((tag) => lines.push(`  - ${yamlQuote(tag)}`));
  }

  lines.push('tagSlugs:');
  if (tagSlugs.length === 0) {
    lines[lines.length - 1] = 'tagSlugs: []';
  } else {
    tagSlugs.forEach((tag) => lines.push(`  - ${yamlQuote(tag)}`));
  }

  lines.push('---', '');
  return lines.join('\n');
}

async function migrate() {
  const posts = JSON.parse(await fs.readFile(contentJsonPath, 'utf8'));
  await fs.rm(postsDir, { recursive: true, force: true });
  await fs.mkdir(postsDir, { recursive: true });

  for (const post of posts) {
    const htmlPath = path.join(root, post.path, 'index.html');
    const html = await fs.readFile(htmlPath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    const entry = $('.article-entry').first();

    if (!entry.length) {
      throw new Error(`Missing .article-entry in ${post.path}`);
    }

    cleanEntry($, entry);
    const description = descriptionFrom($, entry);
    const markdown = turndown.turndown(entry.html() ?? '').trim();
    const output = `${frontmatter(post, description)}${markdown}\n`;
    await fs.writeFile(path.join(postsDir, fileNameFor(post)), output);
  }

  console.log(`Migrated ${posts.length} posts to ${path.relative(root, postsDir)}`);
}

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
