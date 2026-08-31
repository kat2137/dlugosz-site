import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    outcome: z.string(),
    kind: z.enum(['robotics', 'mechanism', 'software']),
    year: z.number(),
    order: z.number(),
    draft: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(3)
      .default([]),
    credits: z.array(z.string()).default([]),
  }),
});

export const collections = { work };
