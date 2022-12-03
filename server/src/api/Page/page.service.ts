import { Page, Pages } from './page.model'
import { ObjectId } from 'mongodb'
import { getPageRatings } from '../../lib/PageSpeedApi'
import { getTimestamp } from '../../lib/getTimestamp'



export const fetchAll = async () => Pages.find().toArray()
export const find = async ( id: ObjectId ) => Pages.findOne( { _id: id } )
export const store = async ( page: Page ) => Pages.insertOne( page )
export const update = async ( id: ObjectId, page: Page ) => Pages.findOneAndUpdate( { _id: id },
  { $set: { ...page, updatedAt: getTimestamp() } },
  { returnDocument: 'after' } )
export const destroy = async ( id: ObjectId ) => Pages.findOneAndDelete( { _id: id } )
