import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../actions/userActions'

const VerifyUserScreen = ({ match, history }) => {
	const { id, token } = match.params

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verifyUser(id, token))
		history.push('/login')
	}, [])
	return (
		<>
			<p>認証完了　＋　マーク!　５秒後にログイン画面？</p>
		</>
	)
}

export default VerifyUserScreen
