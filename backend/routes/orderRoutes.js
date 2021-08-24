import express from 'express'
const router = express.Router()
import {
	addOrderItems,
	getOrderById,
	stripeApi,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
} from '../controllers/orderController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/stripe').post(protect, stripeApi)
// router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
