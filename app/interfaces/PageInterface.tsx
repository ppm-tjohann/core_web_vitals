import { Rating } from './RatingInterface'



export interface Page {
    id: number
    domain_id: number
    url: string
    created_at: Date
    updated_at: Date
    ratings?: Rating[]
}