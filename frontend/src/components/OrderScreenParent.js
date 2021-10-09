import React from 'react'

import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js/pure'
import OrderScreen from '../screens/OrderScreen'

const OrderScreenParent = ({ match, history }) => {
	const PUBLIC_KEY =
		'pk_live_51JhBtOGBYewul3wwTHX1ZbJENfmXoKL18EVaztjUIiaSXtEBdoYRo91cDTkA0KfDdWFejJgTQYe25T7y6nQnpHrD007CpugwIf'
	// const PUBLIC_KEY =
	// 	'pk_test_51IJyo2KVaW87j9kXOP9qNXMzZh4kXnF7aGEjohGwCfJlsS6XqHkTOii3ByC1CM1ypH8LYnk9iSk147lQklOJM7u900sGjrw6jH'

	// const stripePromise = loadStripe(PUBLIC_KEY)

	let stripePromise
	const getStripe = () => {
		if (!stripePromise) {
			stripePromise = loadStripe(PUBLIC_KEY)
		}
		return stripePromise
	}

	return (
		<Elements stripe={getStripe()}>
			<OrderScreen match={match} history={history} />
		</Elements>
	)
}

export default OrderScreenParent
