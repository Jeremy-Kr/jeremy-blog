import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  return await getCollection("blog");
}

export function getPublishedPosts(posts: CollectionEntry<"blog">[]): CollectionEntry<"blog">[] {
  return posts.filter((post) => !post.data.draft);
}

export function sortPostsByDate(posts: CollectionEntry<"blog">[]): CollectionEntry<"blog">[] {
  return posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export function getUniqueCategories(posts: CollectionEntry<"blog">[]): string[] {
  return Array.from(new Set(posts.map((post) => post.data.category)));
}