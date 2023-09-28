import express from 'express'
import { userRegister } from '../controllers/user-controller.js'
import registerMiddleware from '../middleware/register-middleware.js'

const router = express.Router()

router.post('/', registerMiddleware, userRegister)
router.put('/verify')

export default router