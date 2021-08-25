// import express from 'express'
// import dotenv from 'dotenv'

// import generateToken from '../utils/generateToken.js'
// // import passport from '../config/passport.js'
// import passport from 'passport'
// import asyncHandler from 'express-async-handler'

// import passportGoogleOauth2 from 'passport-google-oauth20'
// import mongoose from 'mongoose'
// import User from '../models/userModels.js'

// dotenv.config()

// const router = express.Router()

// const GoogleStrategy = passportGoogleOauth2.Strategy

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			// FIXME: Enable to switch local & production environment.
// 			callbackURL: `http://localhost:3000`,
// 			// passReqToCallback: true,
// 			// prompt: 'consent',
// 		},
// 		async (accessToken, refreshToken, profile, done) => {
// 			const newUser = {
// 				googleId: profile.id,
// 				name: profile.displayName,
// 				email: profile.emails[0].value,
// 			}
// 			console.log(newUser)
// 			try {
// 				let user = await User.findOne({ googleId: profile.id })
// 				if (user) {
// 					done(null, user)
// 				} else {
// 					user = await User.create(newUser)
// 					done(null, user)
// 				}
// 			} catch (err) {
// 				console.error(err)
// 			}
// 		}
// 	)
// )

// passport.serializeUser((user, done) => {
// 	done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
// 	User.findById(id, (err, user) => done(err, user))
// })

// // @desc Auth with Google
// // @route GET /auth/google

// router.get(
// 	'/google',
// 	(req, res, next) => {
// 		req.session.redirectPath = req.query.redirect
// 		next()
// 	},
// 	passport.authenticate('google', { scope: ['profile', 'email'] })
// )
// // router.get(
// // 	'/google',
// // 	passport.authenticate('google', { scope: ['email', 'profile'] })
// // )

// // @desc Google auth callback
// // @route GET /auth/google/callback

// router.get(
// 	'/auth/google/callback',
// 	passport.authenticate('google', { failureRedirect: '/' }),
// 	(req, res) => {
// 		const redirect = req.session.redirectPath
// 		console.log(redirect)
// 		res.redirect(`http://localhost:3000/login?redirect=${redirect}`)
// 	}
// )
// // (req, res) => {
// // 	const redirect = req.session.redirectPath
// // 	//fixme
// // 	res.redirect(`http://127.0.0.1:5000/login?redirect=${redirect}`)
// // }

// router.get('/currentuser', (req, res) => {
// 	const user = req.user

// 	console.log(req.user)
// 	if (user) {
// 		res.json({
// 			_id: user._id,
// 			googleId: user.googleId,
// 			name: user.name,
// 			email: user.email,
// 			isAdmin: user.isAdmin,
// 			token: generateToken(user._id),
// 		})
// 	} else {
// 		res.send(null)
// 	}
// })

// // router.get('/logout', (req, res) => {
// // 	req.logout()
// // 	res.redirect(originUri)
// // })

// export default router
