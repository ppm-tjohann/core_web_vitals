import * as z from 'zod'
import { ObjectId, WithId } from 'mongodb'
import { db } from '../../db'
import { Ratings } from '../Rating/rating.model'



export const Page = z.object( {
    name: z.string(),
    domain: z.string().refine( val => ObjectId.isValid( val ) ),
    updatedAt: z.date(),
    hasLightHouseError: z.boolean().default( false ),
    defaultRatings: Ratings.optional(),
    ratings: Ratings.array().optional(),
} )

export type Page = z.infer<typeof Page>
export type PageWithId = WithId<Page>
export const Pages = db.collection<Page>( 'pages' )
