import axios from 'axios'
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_RESET,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_LIST_REQUEST,
	USER_LIST_FAIL,
	USER_LIST_SUCCESS,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_PASSWORD_RESET_SUCCESS,
	USER_PASSWORD_RESET_REQUEST,
	USER_PASSWORD_RESET_FAIL,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
	USER_VERIFY_FAIL,
} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
// import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const login = (email, password, savePassword) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/users/login',
			{ email, password, savePassword },
			config
		)
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
		// localStorage.setItem('userInfo', JSON.stringify(data))

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === "Cannot read property 'verify' of null") {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: 'パスワードまたはメールアドレスが異なります。',
			})
		} else {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: message,
			})
		}
	}
}

//googleauth

export const getGoogleUserInfo = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST })

			const { data } = await axios.get('/api/auth/currentuser')
			console.log(data)
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}
}

export const logout = () => async (dispatch, getState) => {
	localStorage.removeItem('userInfo')
	//maybe
	localStorage.removeItem('shippingAddress')
	//maybe

	const {
		userLogin: { userInfo },
	} = getState()

	if (userInfo.googleId) {
		await axios.get('/api/auth/logout')
	}
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: ORDER_LIST_MY_RESET })
	dispatch({ type: USER_LIST_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		)
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

		// localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const registerGuest = (email) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post('/api/users/guest', { email }, config)

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/users/${id}`, config)
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.put(`/api/users/profile`, user, config)
		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
		// dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/users`, config)
		dispatch({ type: USER_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/users/${id}`, config)

		dispatch({ type: USER_DELETE_SUCCESS })
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: USER_DELETE_FAIL,
			payload: message,
		})
	}
}

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(`/api/users/${user._id}`, user, config)

		dispatch({ type: USER_UPDATE_SUCCESS })

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

		dispatch({ type: USER_DETAILS_RESET })
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: message,
		})
	}
}

export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({
			type: USER_PASSWORD_RESET_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			`/api/users/forgot`,
			{ email },
			config
		)

		dispatch({
			type: USER_PASSWORD_RESET_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		dispatch({
			type: USER_PASSWORD_RESET_FAIL,
			payload: message,
		})
	}
}

export const sendResetPassword = (token, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_PASSWORD_RESET_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.put(
			`/api/users/password-reset/${token}`,
			{ password },
			config
		)

		dispatch({
			type: USER_PASSWORD_RESET_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		dispatch({
			type: USER_PASSWORD_RESET_FAIL,
			payload: message,
		})
	}
}

export const verifyUser = (id, token) => async (dispatch) => {
	try {
		dispatch({
			type: USER_VERIFY_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			`/api/users/verify/${id}/${token}`,
			{ id, token },
			config
		)
		dispatch({
			type: USER_VERIFY_SUCCESS,
			payload: data,
		})

		console.log(data)
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		dispatch({
			type: USER_VERIFY_FAIL,
			payload: message,
		})
	}
}
