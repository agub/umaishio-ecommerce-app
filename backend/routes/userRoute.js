import express from 'express'
const router = express.Router()
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
	registerGuest,
	addUserShippingInfo,

	//forgotPassword
	resetPassword,
	forgotPassword,
	//forgotPassword
	verifyEmail,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/guest').post(registerGuest)
//verify
router.route('/verify/:id/:token').post(verifyEmail)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

router.route('/shipping/:id').put(protect, addUserShippingInfo)

//forgotPassword
router.route('/forgot').post(forgotPassword)

router.route('/password-reset/:token').put(resetPassword)
//forgotPassword

router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

export default router
