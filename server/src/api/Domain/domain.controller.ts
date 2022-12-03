import { NextFunction, Response, Request } from 'express'
import * as Domains from './domain.service'
import { ParamsWithId } from '../../interfaces/ParamsWithId'
import { Domain, DomainWithId } from './domain.model'
import { ObjectId } from 'mongodb'
import { SitemapError } from '../../lib/Sitemap'



export const get = async (
  req: Request<{}>, res: Response, next: NextFunction ) => {
    try {
        const domains = await Domains.fetchAll()
        res.json( domains )
    }
    catch ( e ) {
        next( e )
    }
}
export const getWithPages = async (
  req: Request<{}>, res: Response, next: NextFunction ) => {
    try {
        const domains = await Domains.getWithPages()
        res.json( domains )
    }
    catch ( e ) {
        next( e )
    }
}

export const find = async (
  req: Request<ParamsWithId>, res: Response, next: NextFunction ) => {
    try {
        const domain = await Domains.fetchOne( new ObjectId( req.params.id ) )
        if ( !domain ) {
            res.status( 404 )
            throw new Error( `Domain with id '${req.params.id}' not found` )
        }
        res.json( domain )
    }
    catch ( e ) {
        next( e )
    }
}
export const findWithPages = async (
  req: Request<ParamsWithId>, res: Response, next: NextFunction ) => {
    try {
        const domain = await Domains.findWithPages( new ObjectId( req.params.id ) )
        if ( !domain ) {
            res.status( 404 )
            throw new Error( `Domain with id '${req.params.id}' not found` )
        }
        res.json( domain )
    }
    catch ( e ) {
        next( e )
    }
}

export const store = async (
  req: Request<{}, DomainWithId, Domain>,
  res: Response<DomainWithId>,
  next: NextFunction,
) => {
    try {
        const storedDomain = await Domains.store( req.body )
        const newDomain = { _id: storedDomain.insertedId, ...req.body }

        // Creating Pages based on Sitemap
        try {
            await Domains.createPages( newDomain )
        }
        catch ( e ) {
            if ( e instanceof SitemapError ) {
                newDomain.sitemapFound = false
                await Domains.update( newDomain._id, { ...newDomain, sitemapFound: false } )
                res.status( 404 )
                res.json( newDomain )
            }
            else {
                throw new Error( 'Unknown Error occurred' )
            }
        }

        res.status( 201 )
        res.json( newDomain )
    }
    catch ( e ) {
        next( e )
    }
}

export const update = async (
  req: Request<ParamsWithId, DomainWithId, Domain>,
  res: Response<DomainWithId>,
  next: NextFunction,
) => {
    try {
        const updatedDomain = await Domains.update(
          new ObjectId( req.params.id ), req.body )
        if ( !updatedDomain.value ) {
            res.status( 404 )
            throw new Error( `Domain with id '${req.params.id}' not found` )
        }
        res.json( updatedDomain.value )
    }
    catch ( e ) {
        next( e )
    }
}

export const destroy = async (
  req: Request<ParamsWithId>,
  res: Response<DomainWithId>,
  next: NextFunction,
) => {
    try {
        const deletedDomain = await Domains.destroy(
          new ObjectId( req.params.id ),
        )

        if ( !deletedDomain.value ) {
            res.status( 404 )
            throw new Error( `Domain with id '${req.params.id}' not found` )
        }
        res.status( 200 )
        res.json( deletedDomain.value )

    }
    catch ( e ) {
        next( e )
    }

}







