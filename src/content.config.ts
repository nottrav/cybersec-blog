import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) =>
      entry.replace(/\/index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    series: z
      .object({
        name: z.string(),
        order: z.number(),
      })
      .optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) =>
      entry.replace(/\/index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    status: z.enum(["planning", "in-progress", "completed"]).optional(),
    stack: z.array(z.string()).optional(),
    image: z.string().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

export const collections = { blog, projects };
