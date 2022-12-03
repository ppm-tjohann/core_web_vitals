import * as PageService from '../../api/Page/page.service'
import * as DomainService from '../../api/Domain/domain.service'
import { Page, PageWithId } from '../../api/Page/page.model'
import { getPageRatings } from '../../lib/PageSpeedApi'
import { getTimestamp } from '../../lib/getTimestamp'
import { Ratings } from '../../api/Rating/rating.model'
import { ObjectId } from 'mongodb'



/**
 * 1. Fetch all Pages and Sort Pages by Update
 * */

const sortPagesByDate = ( pages: PageWithId[] ) => pages.sort( ( a, b ) => ( Number( a.updatedAt ) - Number( b.updatedAt ) ) )

const fetchAllPages = async (): Promise<PageWithId[]> => {
    console.log( 'Fetching Pages' )
    let pages = await PageService.fetchAll()
    return sortPagesByDate( pages )
}
const getNewDefaultRatings = ( ratings: Ratings[] ): Ratings => {
    console.log( 'getting new defaultRatings' )
    let newDefaultRatings = {
        seo: 0,
        accessibility: 0,
        performance: 0,
        updatedAt: getTimestamp(),
    }
    ratings.forEach( rating => {
        newDefaultRatings.seo += rating.seo === null ? 0 : rating.seo
        newDefaultRatings.performance += rating.performance === null ? 0 : rating.performance
        newDefaultRatings.accessibility += rating.accessibility === null ? 0 : rating.accessibility
    } )
    newDefaultRatings.seo /= ratings.length
    newDefaultRatings.performance /= ratings.length
    newDefaultRatings.accessibility /= ratings.length

    return newDefaultRatings
}

export const CronPageRater = async (): Promise<void> => {
    const pages = await fetchAllPages()
    const page = pages[0]
    try {
        // Rate oldest Page
        const ratings = await getPageRatings( page.name )

        // Update Page

        console.log( 'Rating Page', page )
        let newRatings = page.ratings === undefined ? [] : page.ratings

        newRatings.unshift( {
              seo: ratings.performance.score,
              accessibility: ratings.accessibility.score,
              performance: ratings.performance.score,
              updatedAt: getTimestamp(),
          },
        )

        const defaultRatings = getNewDefaultRatings( newRatings )

        // Max 10 Records
        newRatings = newRatings.slice( 0, 10 )

        await PageService.update( page._id, {
            ...page,
            ratings: newRatings,
            defaultRatings,
        } )

        //const domain = await DomainService.findWithPages( new ObjectId( page.domain ) )

        //console.log( domain.pages )

        console.log( 'Checked Page: ', pages[0].name )
        console.log( `P: ${ratings.performance.score} | S:${ratings.seo.score} | A: ${ratings.accessibility.score}` )
    }
    catch ( e ) {
        console.log( 'Lighthouse Error' )
        await PageService.update( page._id, {
            ...page,
            hasLightHouseError: true,
        } )
    }

}
