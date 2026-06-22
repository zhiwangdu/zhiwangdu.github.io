type MarkdownPost = {
  Content: unknown;
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    legacyPath: string;
    tags?: string[];
    tagSlugs?: string[];
  };
};

export type Post = MarkdownPost & {
  title: string;
  date: Date;
  description: string;
  legacyPath: string;
  tags: string[];
  tagSlugs: string[];
  url: string;
};

const modules = import.meta.glob<MarkdownPost>('../content/posts/*.md', {
  eager: true
});

export function getAllPosts(): Post[] {
  return Object.values(modules)
    .map((post) => {
      const frontmatter = post.frontmatter;
      const legacyPath = frontmatter.legacyPath.replace(/^\/|\/$/g, '');

      return {
        ...post,
        title: frontmatter.title,
        date: new Date(frontmatter.date),
        description: frontmatter.description ?? '',
        legacyPath,
        tags: frontmatter.tags ?? [],
        tagSlugs: frontmatter.tagSlugs ?? [],
        url: `/${legacyPath}/`
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export function getTags(posts = getAllPosts()) {
  const tags = new Map<string, { name: string; slug: string; count: number }>();

  for (const post of posts) {
    post.tags.forEach((name, index) => {
      const slug = post.tagSlugs[index] ?? name;
      const existing = tags.get(slug);

      if (existing) {
        existing.count += 1;
      } else {
        tags.set(slug, { name, slug, count: 1 });
      }
    });
  }

  return [...tags.values()].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, 'zh-CN');
  });
}

export function groupPostsByYear(posts = getAllPosts()) {
  return posts.reduce<Map<string, Post[]>>((groups, post) => {
    const year = String(post.date.getFullYear());
    const group = groups.get(year) ?? [];
    group.push(post);
    groups.set(year, group);
    return groups;
  }, new Map());
}
