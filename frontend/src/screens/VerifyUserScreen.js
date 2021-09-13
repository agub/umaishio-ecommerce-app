import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../actions/userActions'

const VerifyUserScreen = ({ match, history }) => {
	const { id, token } = match.params

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verifyUser(id, token))
		setTimeout(() => {
			history.push('/')
		}, 5000)
	}, [])
	return (
		<>
			<h1>認証完了マーク!　５秒後にホーム？</h1>
			<p>redirect to ????</p>
		</>
	)
}

export default VerifyUserScreen
