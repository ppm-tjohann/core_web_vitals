import { Pages, PageWithId } from './page.model'
import request from 'supertest'
import app from '../../app'
import { DomainWithId } from '../Domain/domain.model'
import { client } from '../../db'



let domain: DomainWithId
let page: PageWithId

jest.setTimeout( 15000 )


async function dropPagesTable() {
    try {
        await Pages.drop()
    }
    catch ( e ) {
    }
}


beforeAll( async () => {
    console.log( 'Running beforeAll Page Tests' )
    await dropPagesTable()
    return
} )

afterAll( async () => {
    await client.close()
} )

describe( 'GET /api/v1/pages', () => {

    it( 'responds with all pages', async () =>
      request( app ).
        get( '/api/v1/pages' ).
        set( 'Accept', 'application/json' ).
        then( response => {
            expect( response.body ).toHaveProperty( 'length' )
            expect( response.body.length ).toBe( 0 )
        } ),
    )
} )

describe( 'POST /api/v1/pages', () => {
    it( 'responds with new created pages', async () => (
      request( app ).
        post( '/api/v1/pages' ).
        send( {
            name: 'Test-Seite',
            domain: domain._id,
        } ).
        set( 'Accept', 'application/json' ).
        expect( 201 ).
        then( ( res ) => {
            page = res.body
            expect( res.body ).toHaveProperty( '_id' )
            expect( res.body ).toHaveProperty( 'name' )
            expect( res.body.name ).toBe( 'Test-Seite' )
            expect( res.body ).toHaveProperty( 'domain' )
            console.log( 'Page REs :', res.body )
            expect( res.body.domain ).toBe( domain._id.toString() )
        } )

    ) )
} )
describe( 'GET /api/v1/pages/:id', () => {
    it( 'responds with single page', async () => (
      request( app ).
        get( `/api/v1/pages/${page._id.toString()}` ).
        set( 'Accept', 'application/json' ).
        then( res => {
            console.log( 'Single Page Request', res.body )
            expect( res.body ).toHaveProperty( '_id' )
            // expect( res.body._id ).toBe( id )
            expect( res.body ).toHaveProperty( 'name' )
            expect( res.body ).toHaveProperty( 'domain' )
            expect( res.body.name ).toBe( 'Test-Seite' )
        } )
    ) )

    it( 'responds with 404', async () => (
      request( app ).
        get( '/api/v1/pages/6339bc4bc1c0be4c5bac7f0a' ).
        set( 'Accept', 'application/json' ).
        expect( 404 ).then( res => {
            expect( res.body ).toHaveProperty( 'message' )
        },
      )
    ) )

} )

