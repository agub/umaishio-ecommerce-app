import express from 'express'

const router = express.Router()
import {
	getProductById,
	getProducts,
	createProductReview,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/:id/reviews').post(protect, createProductReview)

//delete update product etc
//delete
//update
//here
router.route('/:id').get(getProductById)

export default router
