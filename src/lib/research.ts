type MarkdownResearch = {
  Content: unknown;
  frontmatter: {
    title: string;
    description?: string;
    date: string;
    project: string;
    projectSlug: string;
    slug: string;
    sourcePath: string;
    sourceCommit: string;
  };
};

export type ResearchDoc = MarkdownResearch & {
  title: string;
  description: string;
  date: Date;
  project: string;
  projectSlug: string;
  slug: string;
  sourcePath: string;
  sourceCommit: string;
  url: string;
};

const modules = import.meta.glob<MarkdownResearch>('../content/research/**/*.md', {
  eager: true
});

export function getAllResearchDocs(): ResearchDoc[] {
  return Object.values(modules)
    .map((doc) => {
      const frontmatter = doc.frontmatter;

      return {
        ...doc,
        title: frontmatter.title,
        description: frontmatter.description ?? '',
        date: new Date(frontmatter.date),
        project: frontmatter.project,
        projectSlug: frontmatter.projectSlug,
        slug: frontmatter.slug,
        sourcePath: frontmatter.sourcePath,
        sourceCommit: frontmatter.sourceCommit,
        url: `/research/${frontmatter.projectSlug}/${frontmatter.slug}/`
      };
    })
    .sort((a, b) => {
      if (b.date.getTime() !== a.date.getTime()) {
        return b.date.getTime() - a.date.getTime();
      }
      return a.title.localeCompare(b.title, 'zh-CN');
    });
}

export function groupResearchByProject(docs = getAllResearchDocs()) {
  return docs.reduce<Map<string, { name: string; docs: ResearchDoc[] }>>((groups, doc) => {
    const group = groups.get(doc.projectSlug) ?? { name: doc.project, docs: [] };
    group.docs.push(doc);
    groups.set(doc.projectSlug, group);
    return groups;
  }, new Map());
}
