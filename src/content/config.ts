import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    categories: z.array(z.string()), // 'category'를 'categories'로 변경하고 배열로 정의
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};