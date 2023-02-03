import { Rating } from './Rating'



export type Domain = {
    id: number
    favicon: string
    name: string
    pages_count: number
    rating?: Rating | null
    sitemap: string
    sitemapFound: boolean
    url: string

    created_at: string
    updated_at: string
}