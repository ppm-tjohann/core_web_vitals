import request from 'supertest'

import app from '../../app'
import { Domains } from './domain.model'



jest.setTimeout( 15000 )

beforeAll( async () => {
    try {
        await Domains.drop()
    }
    catch ( e ) {
    }
} )

// afterAll( async () => {
//     await client.close()
// } )

describe( 'GET /api/v1/domains', () => {
    it( 'responds with all domains', async () =>
      request( app ).
        get( '/api/v1/domains' ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        then( ( response ) => {
            expect( response.body ).toHaveProperty( 'length' )
            expect( response.body.length ).toBe( 0 )
        } ),
    )
} )

export let domainId = ''

describe( 'POST /api/v1/domains', () => {
    it( 'responds with new created domain', async () =>
      request( app ).
        post( '/api/v1/domains' ).
        send( {
            name: 'https://www.walkdlinik.de',
            sitemap: 'https://www.sitemap.de',
            favicon: 'https://www.favi.de',
        } ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 201 ).
        then( ( response ) => {
            domainId = response.body._id
            expect( response.body ).toHaveProperty( '_id' )
            expect( response.body ).toHaveProperty( 'name' )
            expect( response.body.name ).
              toBe( 'https://www.walkdlinik.de' )
            expect( response.body ).toHaveProperty( 'sitemap' )
            expect( response.body.sitemap ).
              toBe( 'https://www.sitemap.de' )
            expect( response.body ).toHaveProperty( 'favicon' )
            expect( response.body.favicon ).toBe( 'https://www.favi.de' )
        } ),
    )

    it( 'responds with 422', async () =>
      request( app ).
        post( '/api/v1/domains' ).
        send( {
            name: 'https://www.walkdlinik.de',
            sitemap: 'ww.sitemap.de',
            favicon: 'https://www.favi.de',
        } ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 422 ).then( ( response ) => {
          expect( response.body ).toHaveProperty( 'message' )
      } ),
    )

} )

describe( 'GET /api/v1/domains/:id', () => {
    it( 'responds with single domain', async () =>
      request( app ).
        get( `/api/v1/domains/${domainId}` ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 200 ).
        then( ( response ) => {
            expect( response.body ).toHaveProperty( '_id' )
            expect( response.body ).toHaveProperty( 'name' )
            expect( response.body ).toHaveProperty( 'favicon' )
            expect( response.body ).toHaveProperty( 'sitemap' )
        } ),
    )

    it( 'responds with 422, wrong id', async () =>
      request( app ).
        get( `/api/v1/domains/1` ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 422 ).then( ( response ) => {
            expect( response.body ).toHaveProperty( 'message' )
        },
      ),
    )
    it( 'responds with 404, id not found', async () =>
      request( app ).
        get( `/api/v1/domains/6339bc4bc1c0be4c5bac7f0a` ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 404 ).then( ( response ) => {
          expect( response.body ).toHaveProperty( 'message' )
      } ),
    )

} )

describe( 'PUT /api/v1/domains/:id', () => {
    it( 'responds with 404, missing id', async () =>
      request( app ).
        put( '/api/v1/domains/' ).
        send( {
            name: 'https://www.walkdlinik.de',
            sitemap: 'https://www.sitemap.de',
            favicon: 'https://www.favi.de',
        } ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 404 ).
        then( ( response ) => {
            expect( response.body ).toHaveProperty( 'message' )
        } ),
    )

    it( 'responds with 422, wrong body', async () =>
      request( app ).
        put( `/api/v1/domains/${domainId}` ).
        send( {
            name: 'https://www.walkdlinik.de',
            sitemap: 'ww.sitemap.de',
            favicon: 'https://www.favi.de',
        } ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 422 ).then( ( response ) => {
          expect( response.body ).toHaveProperty( 'message' )
      } ),
    )
    it( 'responds with updated domain', async () =>
      request( app ).
        put( `/api/v1/domains/${domainId}` ).
        send( {
            name: 'https://www.new-walkdlinik.de',
            sitemap: 'https://www.new-sitemap.de',
            favicon: 'https://www.new-favi.de',
        } ).
        set( 'Accept', 'application/json' ).
        expect( 'Content-Type', /json/ ).
        expect( 200 ).then( ( response ) => {
          expect( response.body ).toHaveProperty( '_id' )
          expect( response.body ).toHaveProperty( 'name' )
          expect( response.body.name ).toBe( 'https://www.new-walkdlinik.de' )
          expect( response.body ).toHaveProperty( 'sitemap' )
          expect( response.body.sitemap ).toBe( 'https://www.new-sitemap.de' )
          expect( response.body ).toHaveProperty( 'favicon' )
          expect( response.body.favicon ).toBe( 'https://www.new-favi.de' )
      } ),
    )

} )

describe( 'DELETE /api/v1/domains/:id', () => {
    it( 'responds with deleted Domain', async () => {
        request( app ).
          delete( `/api/v1/domains/${domainId}` ).set( 'Accept', 'application/json' ).
          expect( 200 ).then( res => {
            expect( res.body ).toHaveProperty( 'name' )
            expect( res.body ).toHaveProperty( 'favicon' )
            expect( res.body ).toHaveProperty( 'sitemap' )
        } )
    } )

    it( 'responds with 404', async () =>
      request( app ).
        get( `/api/v1/domains/${domainId}` ).
        set( 'Accept', 'application/json' ).
        expect( 404 ).then( res => {
          console.log( 'Delete Res Body', res.body )
          expect( res.body ).toHaveProperty( 'message' )
      } ),
    )
} )

