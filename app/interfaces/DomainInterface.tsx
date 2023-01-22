import * as z from 'zod'
import { Page } from './PageInterface'



export const AddDomainRequest = z.object( {
    name: z.string().min( 1 ),
    url: z.string().url(),
    favicon: z.string().url().optional(),
    sitemap: z.string().url(),

} )
export const UpdateDomainRequest = z.object( {
    name: z.string().min( 1 ).optional(),
    url: z.string().url().optional(),
    favicon: z.string().url().optional(),
    sitemap: z.string().url().optional(),
} )
export type BaseDomain = z.infer<typeof AddDomainRequest>

export interface Domain extends BaseDomain {
    id: number
    sitemapFound: string
    ratings: any
    rating: null
    pages_count: number
    created_at: string
    updated_at: string
    pages?: Page[],
}