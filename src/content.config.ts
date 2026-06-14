import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Markdown is the source of truth and lives at the repo root under content/,
// so it stays easy to find and edit without digging through app code.
// Schemas are deliberately permissive — capture should never block on metadata.

// Dated work notes / journal entries.
const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/log' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(), // optional id of a related project
    pinned: z.boolean().default(false),
  }),
});

// Longer efforts. `status` is a lifecycle, not a judgement: dropping something
// to `paused` is a normal resting state, and reviving it is a one-word edit.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z
      .enum(['spark', 'active', 'paused', 'shipped', 'abandoned'])
      .default('spark'),
    started: z.coerce.date().optional(),
    updated: z.coerce.date().optional(), // last touched — drives "resurface"
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// Promoted ideas worth keeping (graduated out of the inbox).
const ideas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/ideas' }),
  schema: z.object({
    title: z.string().optional(),
    captured: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { log, projects, ideas };
