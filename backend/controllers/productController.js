import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @description   fetch all products
// @route         GET /api/products
// @access        Public

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
	res.json(products)
})

// @description   fetch single products
// @route         GET /api/products/:id
// @access        Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
// @description   create new review
// @route         POST /api/products/:id/reviews
// @access        Public

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const alreadyReview = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)
		if (alreadyReview) {
			res.status(400)
			throw new Error('レビュー済みです')
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}

		product.reviews.push(review)

		product.numReviews = product.reviews.length

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length

		await product.save()
		res.status(201).json({ message: 'レビューを追加しました' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export { getProducts, getProductById, createProductReview }
