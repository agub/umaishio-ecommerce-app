import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { forgotPassword } from '../actions/userActions'

import Background from '../data/images/bgc_blur.png'
import ModalContainer from '../components/ModalContainer'

const ForgotPasswordScreen = ({ location, history }) => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { loading, success, error } = userUpdateProfile

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		dispatch({ type: USER_UPDATE_PROFILE_RESET })
	}, [])

	useEffect(() => {
		if (success) {
			history.push('/checkemail')
			dispatch({ type: USER_UPDATE_PROFILE_RESET })
		}
	}, [success])
	const resetPasswordRequest = (e) => {
		e.preventDefault()
		if (email !== '') {
			dispatch(forgotPassword(email))
			setEmail('')
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
				{/* <h1>ゲスト</h1> */}
				{success && (
					<Message>
						パスワード再設定ページへのメールをお送りました。
						info@umaishio.comからのメールをお探しください。
					</Message>
				)}
				{error && <Message>{error}</Message>}

				<h1 style={{ fontSize: '1.5rem' }}>パスワードのリセット</h1>
				{loading && <Loader />}
				<Form onSubmit={resetPasswordRequest}>
					<Form.Group controlId='email' className='mt-3'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								Eメール{' '}
								<span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								required
								type='email'
								placeholder='Eメール'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>
						例: umaishio@gmail.com
					</p>

					{/* <div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Button type='submit'>次へ進む</Button>
						<Link
							onClick={() =>
								dispatch({ type: USER_UPDATE_PROFILE_RESET })
							}
							className='btn btn-light my-3'
							to='/login'
						>
							戻る
						</Link>
					</div> */}
					<Button type='submit' className='next-gradient-btn__g mt-4'>
						<div>
							次へ進む
							{/* <span style={{ marginLeft: 'auto' }}> */}
							<i className='fas fa-chevron-right fa-position-right'></i>
						</div>
					</Button>
					<div className='py-3' style={{ textAlign: 'end' }}>
						<Link
							to={
								redirect
									? `/register?redirect=${redirect}`
									: '/register'
							}
						>
							<span className='login-register-button'>
								未登録の方はこちら
							</span>
						</Link>
					</div>
				</Form>

				{/* <Row className='py-3'>
					<Col>
						未登録の方は{' '}
						<Link
							to={
								redirect
									? `/register?redirect=${redirect}`
									: '/register'
							}
						>
							新規登録
						</Link>
					</Col>
				</Row> */}
			</ModalContainer>
		</div>
	)
}
export default ForgotPasswordScreen
