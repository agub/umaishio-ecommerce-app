import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

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

// @description   Delete a product
// @route         GET /api/products/:id
// @access        Public
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		await product.remove()
		res.json({ message: '商品を削除しました' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.description = description
		product.image = image
		product.brand = brand
		product.category = category
		product.countInStock = countInStock

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @description   create new review
// @route         POST /api/products/:id/reviews
// @access        Public

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment, userInfo } = req.body
	const product = await Product.findById(req.params.id)
	if (product) {
		const alreadyReview = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)
		if (alreadyReview) {
			res.status(400)
			throw new Error('レビュー済みです')
		}

		const isPurchased = await Order.find({ user: req.user._id })
		if (isPurchased) {
			res.status(400)
			throw new Error('購入後レビューが投稿可能です')
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
	// const { rating, comment } = req.body
	// const product = await Product.findById(req.params.id)
	// // Bring in user orders to check if they ordered the product
	// const orders = await Order.find({ user: req.user._id })
	// // Array of product ids that the user ordered
	// const ordersItems = [].concat.apply(
	// 	[],
	// 	orders.map((order) =>
	// 		order.orderItems.map((item) => item.product.toString())
	// 	)
	// )
	// if (product) {
	// 	// Check if the id of the product matches any of the users ordered products
	// 	const hasBought = ordersItems.includes(product._id.toString())
	// 	if (!hasBought) {
	// 		res.status(400)
	// 		throw new Error('購入後レビューが可能です')
	// 	}
	// 	const alreadyReviewed = product.reviews.find(
	// 		(r) => r.user.toString() === req.user._id.toString()
	// 	)
	// 	if (alreadyReviewed) {
	// 		res.status(400)
	// 		throw new Error('レビューは既に書き込まれています')
	// 	}
	// 	const review = {
	// 		name: req.user.name,
	// 		rating: Number(rating),
	// 		comment,
	// 		user: req.user._id,
	// 	}
	// 	product.reviews.push(review)
	// 	product.numReviews = product.reviews.length
	// 	product.rating =
	// 		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
	// 		product.reviews.length
	// 	await product.save()
	// 	res.status(201).json({ message: 'レビューを追加しました' })
	// } else {
	// 	res.status(404)
	// 	throw new Error('Product not found')
	// }
})

export {
	getProducts,
	getProductById,
	createProductReview,
	deleteProduct,
	createProduct,
	updateProduct,
}
