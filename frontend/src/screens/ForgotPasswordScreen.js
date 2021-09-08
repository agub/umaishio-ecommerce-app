import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { forgotPassword } from '../actions/userActions'

const ForgotPasswordScreen = ({ location, history }) => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { loading, success, error } = userUpdateProfile

	const redirect = location.search ? location.search.split('=')[1] : '/'

	// useEffect(() => {
	// 	// if () {
	// 	history.push(redirect)
	// 	// }
	// }, [history, redirect])

	const resetPasswordRequest = (e) => {
		e.preventDefault()
		if (email !== '') {
			dispatch(forgotPassword(email))
			setEmail('')
		}
	}

	return (
		<FormContainer>
			{/* <h1>ゲスト</h1> */}
			{success && (
				<Message>
					パスワード再設定ページへのメールをお送りました。
				</Message>
			)}
			{error && <Message>{error}</Message>}

			<h1 style={{ fontSize: '1.5rem' }}>パスワードのリセット</h1>
			{loading && <Loader />}
			<Form onSubmit={resetPasswordRequest}>
				<Form.Group controlId='email' className='mt-3'>
					<Form.Label>
						<div className='shipping-form-lable'>
							Email{' '}
							<span className='shipping-form-icon'>必須</span>
						</div>
					</Form.Label>
					<Form.Control
						required
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<p className='m-2 shipping-form-example'>
					例: umaishio@gmail.com
				</p>

				<div
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
				</div>
			</Form>

			<Row className='py-3'>
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
			</Row>
		</FormContainer>
	)
}
export default ForgotPasswordScreen
