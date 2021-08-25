// // const passport = require('passport')
// // const GoogleStrategy = require('passport-google-oauth20').Strategy
// // const mongoose = require('mongoose')

// // const User = require('../models/userModel')

// import passport from 'passport'
// import passportGoogleOauth2 from 'passport-google-oauth20'
// import mongoose from 'mongoose'
// import User from '../models/userModels.js'
// import dotenv from 'dotenv'

// dotenv.config()
// const GoogleStrategy = passportGoogleOauth2.Strategy

// function extractProfile(profile) {
// 	let imageUrl = ''
// 	if (profile.photos && profile.photos.length) {
// 		imageUrl = profile.photos[0].value
// 	}
// 	return {
// 		id: profile.id,
// 		displayName: profile.displayName,
// 		image: imageUrl,
// 	}
// }
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			// FIXME: Enable to switch local & production environment.
// 			callbackURL: `http://localhost:3000/auth/google/callback`,
// 			// passReqToCallback: true,
// 			// prompt: 'consent',
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			// return done(err, profile)
// 			console.log(profile)
// 			cb(null, extractProfile(profile))
// 			// const newUser = {
// 			// 	googleId: profile.id,
// 			// 	name: profile.displayName,
// 			// 	email: profile.emails[0].value,
// 			// }
// 			// console.log(newUser)
// 			// try {
// 			// 	let user = await User.findOne({ googleId: profile.id })
// 			// 	if (user) {
// 			// 		done(null, user)
// 			// 	} else {
// 			// 		user = await User.create(newUser)
// 			// 		done(null, user)
// 			// 	}
// 			// } catch (err) {
// 			// 	console.error(err)
// 			// }
// 		}
// 	)
// )

// // passport.serializeUser((user, done) => {
// // 	done(null, user.id)
// // })

// // passport.deserializeUser((id, done) => {
// // 	User.findById(id, (err, user) => done(err, user))
// // })

// export default passport
