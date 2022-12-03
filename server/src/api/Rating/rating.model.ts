import * as z from 'zod'



export const Ratings = z.object( {
    seo: z.number().int().max( 100 ).min( 1 ).or( z.null() ).default( null ),
    performance: z.number().int().max( 100 ).min( 1 ).or( z.null() ).default( null ),
    accessibility: z.number().int().max( 100 ).min( 1 ).or( z.null() ).default( null ),
    updatedAt: z.date(),
} )
export type Ratings = z.infer<typeof Ratings>