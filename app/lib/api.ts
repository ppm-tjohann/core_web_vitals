import axios from 'axios'
import { BaseDomain, Domain } from '../interfaces/DomainInterface'
import qs from 'qs'
import { Rating } from '../interfaces/RatingInterface'



interface UrlParams {
    [x: string]: string | string[],
}

const getQuery = ( params: UrlParams ) => {
    console.log( 'query params :', params )
    return qs.stringify( params )
}

const {
    API_ROUTE = 'http://localhost:8000/api',
} = process.env

export const api = axios.create( {
    baseURL: API_ROUTE,
} )

const getRequestUrl = ( baseUrl: string, params?: UrlParams ): string => {
    console.log( 'query params :', params )
    const requestUrl = `/${baseUrl}${params ? `?${getQuery( params )}` : ''}`
    console.log( 'RequestUrl :', requestUrl )
    return requestUrl
}

export const DomainHandler = {
    get: ( options?: UrlParams ) => api.get<Domain[]>( getRequestUrl( 'domain', options ) ),
    find: ( id: number, options: UrlParams ) => api.get<Domain>( getRequestUrl( `domain/${id}`, options ) ),
    findWithPages: ( id: number ) => api.get<Domain>( getRequestUrl( `domain/${id}`, { include: [ 'pages', 'pages.ratings' ] } ) ),
    store: ( domain: BaseDomain ) => api.post<Domain>( '/domain', domain ),
    update: ( id: number, domain: BaseDomain ) => api.put( `/domain/${id}` ),
    delete: ( id: number ) => api.delete( `/domain/${id}` ),
}

export const RatingHandler = {
    get: () => api.get<Rating[]>( 'ratings' ),
    latest: () => api.get<Rating[]>( 'ratings?count=10' ),
}
