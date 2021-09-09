import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { sendResetPassword } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ResetPasswordScreen = ({ location, history, match }) => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const token = match.params.id

	const dispatch = useDispatch()

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { loading, success, error } = userUpdateProfile

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				history.push('/login')
				dispatch({ type: USER_UPDATE_PROFILE_RESET })
			}, 10000)
		}
	}, [history, success])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setErrorMsg('パスワードが一致しません')
		} else {
			setErrorMsg('')
			dispatch(sendResetPassword(token, password))
		}
	}

	return (
		<FormContainer>
			<h1 style={{ fontSize: '1.5rem' }}>パスワードのリセット</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{errorMsg && <Message variant='danger'>{errorMsg}</Message>}
			{success && (
				<Message>
					パスワードが変更されました。数秒後に
					<Link to={'/login'}>ログイン画面</Link>に移動します。
				</Message>
			)}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='password'>
					<Form.Label>
						<div className='shipping-form-lable'>
							パスワード{' '}
							{/* <span className='shipping-form-icon'>必須</span> */}
						</div>
					</Form.Label>
					<Form.Control
						type='password'
						placeholder='パスワード'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<p className='m-2 shipping-form-example'>&nbsp;</p>
				<Form.Group controlId='password'>
					<Form.Label>
						<div className='shipping-form-lable'>
							確認パスワード{' '}
							{/* <span className='shipping-form-icon'>必須</span> */}
						</div>
					</Form.Label>
					<Form.Control
						type='password'
						placeholder='確認パスワード'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<p className='m-2 shipping-form-example'>&nbsp;</p>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Button type='submit' variant='primary'>
						パスワードを変更する
					</Button>
				</div>
			</Form>
		</FormContainer>
	)
}

export default ResetPasswordScreen
