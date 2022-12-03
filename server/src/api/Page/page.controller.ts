import { NextFunction, Request, Response } from 'express'
import * as Pages from './page.service'
import { Page, PageWithId } from './page.model'
import { ParamsWithId } from '../../interfaces/ParamsWithId'
import { ObjectId } from 'mongodb'
import { getTimestamp } from '../../lib/getTimestamp'



export const get = async (
  req: Request<{}>,
  res: Response,
  next: NextFunction,
) => {
    try {
        const pages = await Pages.fetchAll()
        res.json( pages )
    }
    catch ( e ) {
        next( e )
    }
}

export const find = async (
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction,
) => {
    try {
        const page = await Pages.find( new ObjectId( req.params.id ) )
        if ( !page ) {
            res.status( 404 )
            throw new Error( `Page with id '${req.params.id}' not found` )
        }
        res.json( page )
    }
    catch ( e ) {
        next( e )
    }
}

export const store = async (
  req: Request<{}, PageWithId, Page>,
  res: Response<PageWithId>,
  next: NextFunction,
) => {
    try {
        const storedPage = await Pages.store( { ...req.body, updatedAt: getTimestamp() } )
        res.status( 201 )
        res.json( {
            _id: storedPage.insertedId,
            ...req.body,
        } )
    }
    catch ( e ) {
        next( e )
    }
}

export const update = async (
  req: Request<ParamsWithId, PageWithId, Page>,
  res: Response<PageWithId>,
  next: NextFunction,
) => {
    try {
        const updatedPage = await Pages.update( new ObjectId( req.params.id ), {
            ...req.body,
            updatedAt: getTimestamp(),
        } )
        if ( !updatedPage.value ) {
            res.status( 404 )
            throw new Error( `Page with id '${req.params.id}' not found` )
        }
        res.json( updatedPage.value )
    }
    catch ( e ) {
        next( e )
    }
}


