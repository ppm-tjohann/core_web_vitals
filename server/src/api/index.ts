import express from 'express'

import domains from './Domain/domains.routes'
import pages from './Page/pages.routes'



const router = express.Router()

router.use( '/pages', pages )
router.use( '/domains', domains )

export default router
