import { Page } from './Page'
import { Domain } from './Domain'



export type Rating = {
    id: number
    seo: number
    performance: number
    accessibility: number

    updated_at: string
    created_at: string

    ratable?: Page | Domain
}