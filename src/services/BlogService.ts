import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export class BlogService {
  private posts: CollectionEntry<"blog">[] = [];

  async fetchAllPosts(): Promise<BlogService> {
    this.posts = await getCollection("blog");
    return this;
  }

  setPosts(posts: CollectionEntry<"blog">[]): BlogService {
    this.posts = posts;
    return this;
  }

  filterPublished(): BlogService {
    this.posts = this.posts.filter((post) => !post.data.draft);
    return this;
  }

  sortByDate(): BlogService {
    this.posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
    return this;
  }

  filterByCategory(category: string): BlogService {
    this.posts = this.posts.filter(
      (post) => post.data.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    );
    return this;
  }

  limitPosts(count: number): BlogService {
    this.posts = this.posts.slice(0, count);
    return this;
  }

  getUniqueCategories(): string[] {
    const categoriesSet = new Set(this.posts.flatMap(post => post.data.categories));
    return Array.from(categoriesSet);
  }

  getPosts(): CollectionEntry<"blog">[] {
    return this.posts;
  }
}