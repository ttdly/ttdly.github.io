import {defineCollection, defineContentConfig, z} from '@nuxt/content'

const commonSchema = z.object({
    create: z.date(),
    update: z.date(),
    labels: z.array(z.string()),
    locked: z.boolean(),
});

export default defineContentConfig({
    collections: {
        articles: defineCollection({
            type: 'page',
            source: 'article/*.md',
            schema: commonSchema,
        }),
        notes: defineCollection({
            type: 'page',
            source: 'note/*.md',
            schema: commonSchema,
        }),
        essays: defineCollection({
            type: 'page',
            source: 'essays/*.md',
            schema: commonSchema,
        })
    }
})
