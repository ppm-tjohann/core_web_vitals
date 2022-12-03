import { Router } from 'express'
import * as PageController from './page.controller'
import { validateRequest } from '../../middlewares'
import { Page } from './page.model'
import { ParamsWithId } from '../../interfaces/ParamsWithId'



const router = Router()

router.get( '/', PageController.get )
router.get( '/:id', validateRequest( { params: ParamsWithId } ), PageController.find )
router.post( '/', validateRequest( { body: Page } ), PageController.store )

export default router