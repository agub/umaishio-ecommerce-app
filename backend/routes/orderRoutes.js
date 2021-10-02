import express from 'express'

const router = express.Router()
import {
	addOrderItems,
	getOrderById,
	stripeApi,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	bankTransferOrder,
	updateOrderShippingInfo,
	updateShippingFee,
} from '../controllers/orderController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/stripe').post(protect, stripeApi)
router.route('/:id/banktransfer').post(protect, bankTransferOrder)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/updateShipper').put(protect, updateOrderShippingInfo)
router.route('/:id/updateFee').put(protect, updateShippingFee)

export default router
