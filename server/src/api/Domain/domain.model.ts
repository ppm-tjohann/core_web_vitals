import * as z from 'zod'
import { WithId } from 'mongodb'
import { db } from '../../db'
import { Ratings } from '../Rating/rating.model'
import { PageWithId } from '../Page/page.model'



export const Domain = z.object( {
    name: z.string().url(),
    favicon: z.string().url(),
    sitemap: z.string().url(),
    updatedAt: z.date().optional(),
    sitemapFound: z.boolean().default( true ),
    defaultRatings: Ratings.optional(),
} )

export type Domain = z.infer<typeof Domain>;
export type DomainWithId = WithId<Domain>;
export type DomainWithPages = DomainWithId & { pages: PageWithId[] };

export const Domains = db.collection<Domain>( 'domains' )
