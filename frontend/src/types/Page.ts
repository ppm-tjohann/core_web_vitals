import { Rating } from './Rating'



export type Page = {
    id: number
    average_ratings?: Rating | null
    domain_id: number
    error: number
    ratings?: Rating[]
    url: string
    updated_at: string
    created_at: string
}