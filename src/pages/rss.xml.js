import rss from '@astrojs/rss';
import { site } from '../data/site';
import { getAllPosts } from '../lib/posts';

export async function GET(context) {
  const posts = getAllPosts();

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.description,
      link: post.url
    }))
  });
}
