import { Domain, Domains, DomainWithId } from './domain.model'
import { ObjectId } from 'mongodb'
import * as Sitemap from '../../lib/Sitemap'
import * as PageService from '../Page/page.service'
import { Page, Pages } from '../Page/page.model'
import { getPageRatings } from '../../lib/PageSpeedApi'
import { getTimestamp } from '../../lib/getTimestamp'



export const fetchAll = async () => ( Domains.find().toArray() )
export const fetchOne = async ( id: ObjectId ) => ( Domains.findOne( { _id: id } ) )
export const store = async ( domain: Domain ) => ( Domains.insertOne( { ...domain, updatedAt: getTimestamp() } ) )

export const update = async ( id: ObjectId, domain: Domain ) => (
  Domains.findOneAndUpdate( { _id: id },
    { $set: domain },
    { returnDocument: 'after' },
  ) )

export const destroy = async ( id: ObjectId ) => Domains.findOneAndDelete( { _id: id } )

export const createPages = async ( domain: DomainWithId ): Promise<void> => {
    const pages = await Sitemap.getPages( domain.sitemap )
    pages.forEach( page => {
        PageService.store( {
            name: page.loc,
            domain: domain._id.toString(),
            updatedAt: getTimestamp(),
            hasLightHouseError: false,
        } )
    } )
    await getPageRatings( pages[0].loc )

}

export const getWithPages = async () => {
    const domains = await fetchAll()
    console.log( 'Getting pages for :', domains )
    const domainWithPages = Promise.all( domains.map( async ( domain ) => {
        return ( {
            ...domain,
            pages: await getPages( domain._id ),
        } )
    } ) )
    return domainWithPages
}
export const findWithPages = async ( id: ObjectId ) => {
    const pages = await getPages( id )
    console.log( 'Found Pages :', pages )
    const domain = await fetchOne( id )
    console.log( 'Found Domain : ', domain )
    return { ...domain, pages }
}

const getPages = async ( id: ObjectId ) => await Pages.find( { domain: id.toString() } ).toArray()





