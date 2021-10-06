import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	// ORDER_PAY_REQUEST,
	// ORDER_PAY_FAIL,
	// ORDER_PAY_SUCCESS,
	// ORDER_PAY_RESET,
	// ORDER_LIST_MY_REQUEST,
	// ORDER_LIST_MY_SUCCESS,
	// ORDER_LIST_MY_FAIL,
	// ORDER_LIST_MY_RESET,
	ORDER_LIST_FAIL,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_REQUEST,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_RESET,
	ORDER_CREATE_RESET,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
	STRIPE_PAY_REQUEST,
	STRIPE_PAY_SUCCESS,
	STRIPE_PAY_FAIL,
	STRIPE_PAY_RESET,
	STRIPE_PAY_LOADING_STOP,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_RESET,
	BANKTRANSFER_RESET,
	BANKTRANSFER_FAIL,
	BANKTRANSFER_REQUEST,
	BANKTRANSFER_SUCCESS,
	ORDER_UPDATE_SHIPPER_REQUEST,
	ORDER_UPDATE_SHIPPER_SUCCESS,
	ORDER_UPDATE_SHIPPER_FAIL,
	ORDER_UPDATE_SHIPPINGFEE_REQUEST,
	ORDER_UPDATE_SHIPPINGFEE_SUCCESS,
	ORDER_UPDATE_SHIPPINGFEE_FAIL,
	ORDER_UPDATE_SHIPPINGFEE_RESET,
} from '../constants/orderConstants'

import StripeErrorHandle from '../components/StripeErrorHandle'

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			}
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			}
		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			}
		case ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			}
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ORDER_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_PAY_RESET:
			return {}
		default:
			return state
	}
}

export const stripePayReducer = (state = {}, action) => {
	switch (action.type) {
		case STRIPE_PAY_REQUEST:
			return {
				loading: true,
			}
		case STRIPE_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case STRIPE_PAY_FAIL:
			return {
				loading: false,
				error: StripeErrorHandle(action.payload),
			}
		case STRIPE_PAY_LOADING_STOP:
			return {
				loading: false,
			}
		case STRIPE_PAY_RESET:
			return {}
		default:
			return state
	}
}

export const bankTransferReducer = (state = {}, action) => {
	switch (action.type) {
		case BANKTRANSFER_REQUEST:
			return {
				loading: true,
			}
		case BANKTRANSFER_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case BANKTRANSFER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case BANKTRANSFER_RESET:
			return {}
		default:
			return state
	}
}

export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return {
				loading: true,
			}
		case ORDER_DELIVER_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ORDER_DELIVER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_DELIVER_RESET:
			return {}
		default:
			return state
	}
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return {
				loading: true,
			}
		case ORDER_LIST_MY_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			}
		case ORDER_LIST_MY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_LIST_MY_RESET:
			return {
				orders: [],
			}
		default:
			return state
	}
}

export const orderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return {
				loading: true,
			}
		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			}
		case ORDER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const orderShippingUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_UPDATE_SHIPPER_REQUEST:
			return {
				loading: true,
			}
		case ORDER_UPDATE_SHIPPER_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ORDER_UPDATE_SHIPPER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
export const orderShippingFeeReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_UPDATE_SHIPPINGFEE_REQUEST:
			return {
				loading: true,
			}
		case ORDER_UPDATE_SHIPPINGFEE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ORDER_UPDATE_SHIPPINGFEE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_UPDATE_SHIPPINGFEE_RESET:
			return {
				loading: false,
			}
		default:
			return state
	}
}
