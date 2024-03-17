import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		type: z.string(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		role: z.string().optional(),
		organization: z.string().optional(),
		image: z.string().optional(),
		website: z.string().optional(),
		useHeroOverlay: z.boolean().optional(),
		trailers: z.array(z.object({
			name: z.string(),
			youtube: z.string()
		})).optional(),
		links: z.array(z.object({
			name: z.string(),
			icon: z.string().optional(),
			url: z.string()
		})).optional()
	})
});

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string().optional(),
		tags: z.string().optional(),
		useHeroOverlay: z.boolean().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { blog, projects };
