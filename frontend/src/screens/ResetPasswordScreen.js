import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { sendResetPassword } from '../actions/userActions'

import Background from '../data/images/bgc_blur.png'
import ModalContainer from '../components/ModalContainer'

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
			history.push('/login')
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
		<div
			style={{
				backgroundImage: `url(${Background})`,
			}}
			className='bgi-register__g'
		>
			<ModalContainer>
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
							<div className='shipping-form-lable__g'>
								パスワード{' '}
								<span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='password'
								placeholder='パスワード'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>&nbsp;</p>
					<Form.Group controlId='password'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								確認パスワード{' '}
								<span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='password'
								placeholder='確認パスワード'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>&nbsp;</p>
					<Button type='submit' className='next-gradient-btn__g mt-4'>
						<div>
							パスワードを変更する
							{/* <span style={{ marginLeft: 'auto' }}> */}
							<i className='fas fa-chevron-right fa-position-right'></i>
						</div>
					</Button>
					{/* <div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Button type='submit' variant='primary'>
							パスワードを変更する
						</Button>
					</div> */}
				</Form>
			</ModalContainer>
		</div>
	)
}

export default ResetPasswordScreen
