import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../actions/userActions'

const VerifyUserScreen = ({ match }) => {
	const { id, token } = match.params

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verifyUser(id, token))
	}, [])
	return <>afsfasda</>
}

export default VerifyUserScreen
