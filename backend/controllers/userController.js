import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'
import crypto from 'crypto'

import {
	sendResetEmail,
	sendWelcomeEmail,
	sendShippingStartedEmail,
} from '../utils/email.js'

// @description   Auth user & get token
// @route         POST /api/products
// @access        Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password, savePassword } = req.body

	const user = await User.findOne({ email })
	if (user.verify) {
		throw new Error('メールをチェックして')
	}
	let expiryTime = undefined
	if (!savePassword) {
		expiryTime = Date.now() + 3600000
	}

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			expiry: expiryTime,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isGuest: user.isGuest,
			shippingAddress: user.shippingAddress,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('メールアドレス、もしくはパスワードが異なります。')
	}
})

// @description   Register a new user
// @route         POST /api/products
// @access        Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('このメールアドレスは既に使用されています')
	}
	const emailVerificationToken = crypto.randomBytes(20).toString('hex')
	const user = await User.create({
		name,
		email,
		password,
		verify: emailVerificationToken,
	})

	sendWelcomeEmail(email, name, user._id, user.verify)
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isGuest: user.isGuest,
			shippingAddress: user.shippingAddress,
			verify: user.verify,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

///verify ??

const verifyEmail = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user || user.verify !== req.params.token) {
			throw new Error()
		}
		user.verify = undefined
		await user.save()

		res.send('You may now log in.')
	} catch (err) {
		res.status(400)
		throw new Error('このページは存在しません')
	}
})

// @description   guest Register
// @route         POST /api/guest
// @access        Public
const registerGuest = asyncHandler(async (req, res) => {
	const { email } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('このメールアドレスは既に使用されています')
	}

	const user = await User.create({
		name: 'ゲスト',
		isGuest: true,
		email,
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isGuest: user.isGuest,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @description   Get user profile
// @route         GET /api/users/profile
// @access        Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('ユーザーが見つかりません')
	}
})

// @description   Update user profile
// @route         PUT /api/users/profile
// @access        Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			isGuest: updatedUser.isGuest,
			shippingAddress: user.shippingAddress,
			token: generateToken(updatedUser._id),
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @description  	Get all users
// @route         GET /api/users
// @access        Private/Admin

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

// @description  	DeleteUser
// @route         DELETE /api/users/:id
// @access        Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'ユーザーを削除しました。' })
	} else {
		res.status(404)
		throw new Error('ユーザーが見つかりません')
	}
})

// @description  	GET user by id
// @route         DELETE /api/users/:id
// @access        Private/Admin

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('ユーザーが見つかりません')
	}
})

// @description   Update user profile
// @route         PUT /api/users/:id
// @access        Private/ admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @description   Update user profile
// @route         PUT /api/users/:id
// @access        Private/ admin
const addUserShippingInfo = asyncHandler(async (req, res) => {
	const {
		fullName,
		furigana,
		phoneNumber,
		postalCode,
		prefecture,
		address,
		building,
	} = req.body

	const user = await User.findById(req.params.id)

	if (user && !user.isGuest) {
		user.shippingAddress = {
			fullName: fullName,
			furigana: furigana,
			phoneNumber: phoneNumber,
			postalCode: postalCode,
			prefecture: prefecture,
			address: address,
			building: building,
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			isGuest: updatedUser.isGuest,
			shippingAddress: user.shippingAddress,
			token: generateToken(updatedUser._id),
		})
	} else if (user && user.isGuest) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isGuest: user.isGuest,
			shippingAddress: user.shippingAddress,
			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

//forgotPassword
const forgotPassword = asyncHandler(async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user || user.isGuest) {
			return res
				.status(404)
				.json({ message: 'このメールアドレスは登録されていません' })
		}
		user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
		// user.resetPasswordToken = generateToken(user._id)
		user.resetPasswordExpires = Date.now() + 3600000
		await user.save()
		sendResetEmail(user.email, user.name, user.resetPasswordToken)
		res.status(200).send(user.email, user.name, user.resetPasswordToken)
	} catch (err) {
		res.status(500).send(err.message)
	}
})

const resetPassword = asyncHandler(async (req, res) => {
	try {
		const user = await User.findOne({
			resetPasswordToken: req.params.token,
			resetPasswordExpires: { $gt: Date.now() },
		})
		if (!user) {
			throw new Error('Token is invalid or has expired.')
		}
		if (!req.body.password) {
			throw new Error('No new password provided.')
		}
		user.password = req.body.password
		user.resetPasswordToken = undefined
		user.resetPasswordExpires = undefined
		await user.save()
		res.status(200).json({ message: 'パスワードを変更しました' })
	} catch (err) {
		res.status(400).send(err.message)
	}
})

//forgotPassword
const contactEmailApi = asyncHandler(async (req, res) => {
	const { email, fullName, content } = req.body
	try {
		sendShippingStartedEmail(email, fullName, content)
		res.status(200).json({ message: '送信完了' })
	} catch (err) {
		res.status(400).send(err.message)
	}
})

export {
	verifyEmail,
	authUser,
	getUserProfile,
	registerUser,
	registerGuest,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
	addUserShippingInfo,
	forgotPassword,
	resetPassword,
	contactEmailApi,
}
