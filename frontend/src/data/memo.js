const CARD_OPTIONS = {
	iconStyle: 'solid',
	style: {
		base: {
			iconColor: '#c4f0ff',
			color: '#fff',
			fontWeight: 500,
			fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
			fontSize: '16px',
			fontSmoothing: 'antialiased',
			':-webkit-autofill': {
				color: '#fce883',
			},
			'::placeholder': {
				color: '#87bbfd',
			},
		},
		invalid: {
			iconColor: '#ffc7ee',
			color: '#ffc7ee',
		},
	},
}

// useEffect(() => {
// 	if (updated) history.push('/placeorder')
// 	if (
// 		!userInfo.isGuest &&
// 		Object.keys(userInfo.shippingAddress).length === 0 &&
// 		userInfo.shippingAddress.constructor === Object
// 	) {
// 		handleClose()
// 	}
// 	if (
// 		useAddressHistory &&
// 		Object.keys(userInfo.shippingAddress).length !== 0
// 	) {
// 		setFullName(userInfo.shippingAddress.fullName || '')
// 		setFurigana(userInfo.shippingAddress.furigana || '')
// 		setPhoneNumber(userInfo.shippingAddress.phoneNumber || '')
// 		setPostalCode1(
// 			(userInfo.shippingAddress.postalCode &&
// 				userInfo.shippingAddress.postalCode.substring(0, 3)) ||
// 				''
// 		)
// 		setPostalCode2(
// 			(userInfo.shippingAddress.postalCode &&
// 				userInfo.shippingAddress.postalCode.substring(3, 7)) ||
// 				''
// 		)
// 		setPrefecture(userInfo.shippingAddress.prefecture || '')
// 		setAddress(userInfo.shippingAddress.address || '')
// 		setBuilding(userInfo.shippingAddress.building || '')
// 	}
// }, [updated, userInfo, useAddressHistory])
