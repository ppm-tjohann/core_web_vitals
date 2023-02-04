import { Rating } from './Rating'
import z from 'zod'



export const Domain = z.object( {
    name: z.string().min( 3 ),
    favicon: z.string().url(),
    sitemap: z.string().url(),
    url: z.string().url(),
} )
export type AddDomainRequest = z.infer<typeof Domain>

export type Domain = z.infer<typeof Domain> & {
    id: number
    pages_count: number
    rating?: Rating | null
    sitemapFound: boolean
    created_at: string
    updated_at: string
}