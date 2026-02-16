import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const koPosts = getAllPosts('ko');
  const enPosts = new Set(getAllPosts('en').map((p) => p.slug));
  const koTags = [...getAllTags('ko').keys()];
  const enTags = [...getAllTags('en').keys()];

  // 포스트 페이지
  const posts: MetadataRoute.Sitemap = koPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    alternates: {
      languages: {
        ko: `${SITE_URL}/blog/${post.slug}`,
        ...(enPosts.has(post.slug) && {
          en: `${SITE_URL}/en/blog/${post.slug}`,
        }),
      },
    },
  }));

  // 태그 페이지
  const tags: MetadataRoute.Sitemap = koTags.map((tag) => ({
    url: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
    alternates: {
      languages: {
        ko: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
        ...(enTags.includes(tag) && {
          en: `${SITE_URL}/en/tags/${encodeURIComponent(tag)}`,
        }),
      },
    },
  }));

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = ['', '/about', '/tags'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      alternates: {
        languages: {
          ko: `${SITE_URL}${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
    }),
  );

  return [...staticPages, ...posts, ...tags];
}
