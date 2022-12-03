import { Router } from 'express'
import * as DomainController from './domain.controller'
import { ParamsWithId } from '../../interfaces/ParamsWithId'
import { Domain } from './domain.model'
import { validateRequest } from '../../middlewares'



const router = Router()

router.get( '/', DomainController.get )
router.get( '/withPages', DomainController.getWithPages )
router.get( '/:id', validateRequest( { params: ParamsWithId } ),
  DomainController.find )
router.get( '/withPages/:id', validateRequest( { params: ParamsWithId } ), DomainController.findWithPages )
router.post( '/', validateRequest( { body: Domain } ), DomainController.store )
router.put( '/:id', validateRequest( { params: ParamsWithId, body: Domain } ),
  DomainController.update )
router.delete( '/:id', validateRequest( { params: ParamsWithId } ),
  DomainController.destroy )

export default router