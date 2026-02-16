import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const tags = [...getAllTags().keys()].map((tag) => ({
    url: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
  }));

  const staticPages = ['', '/about', '/tags'].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  return [...staticPages, ...posts, ...tags];
}
