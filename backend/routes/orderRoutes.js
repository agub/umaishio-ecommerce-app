import express from 'express'
const router = express.Router()
import {
	addOrderItems,
	getOrderById,
	stripeApi,
	updateOrderToPaid,
} from '../controllers/orderController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/stripe').post(protect, stripeApi)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router