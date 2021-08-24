import express from 'express'

const router = express.Router()
import {
	getProductById,
	getProducts,
	createProductReview,
	deleteProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/:id/reviews').post(protect, createProductReview)

//delete update product etc
//delete
//update
//here
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

export default router
