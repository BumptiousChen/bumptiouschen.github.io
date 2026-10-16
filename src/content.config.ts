import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['game', 'anime', 'life']).default('life'),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
  }).refine((post) => !post.cover || Boolean(post.coverAlt?.trim()), {
    message: '有封面时请填写 coverAlt 图片说明。',
    path: ['coverAlt'],
  }),
});
export const collections = { blog };
