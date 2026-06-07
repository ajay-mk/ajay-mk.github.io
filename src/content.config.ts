import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const cv = defineCollection({
  loader: file('src/data/cv.yaml'),
  schema: z.object({
    section: z.string(),
    items: z.array(z.object({
      role: z.string(),
      org: z.string().optional(),
      location: z.string().optional(),
      when: z.string().optional(),
      details: z.array(z.string()).optional(),
    })),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { cv, blog };
