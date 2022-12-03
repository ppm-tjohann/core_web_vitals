import axios from 'axios'
// @ts-ignore
import parser from 'xml2json'
import { Sitemap, SitemapPage } from '../interfaces/Sitemap'



export const getPages = async ( href: string ): Promise<SitemapPage[]> => {
    try {
        const fetchedSitemap = await fetchSitemap( href )
        const { url: pages } = fetchedSitemap.urlset
        return pages
    }
    catch ( e ) {
        throw new SitemapError( 'No Sitemap found' )
    }
}

const fetchSitemap = async ( href: string ): Promise<Sitemap> => {
    const { data: sitemapXmlRes } = await axios.get( href )
    let sitemap = parser.toJson( sitemapXmlRes )
    return JSON.parse( sitemap )
}

export class SitemapError extends Error {
    constructor( message: string ) {
        super( message )
        this.name = 'SitemapError'
    }
}