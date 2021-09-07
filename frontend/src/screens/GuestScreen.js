import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

import { registerGuest } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
	const dispatch = useDispatch()

	const [guestEmail, setGuestEmail] = useState('')
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const userRegister = useSelector((state) => state.userRegister)
	const {
		loading: registerLoading,
		error: registerError,
		userInfo: registerUserInfo,
	} = userRegister

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (registerUserInfo) {
			history.push(redirect)
		}
	}, [history, redirect, registerUserInfo])

	const guestHandler = (e) => {
		e.preventDefault()
		if (guestEmail !== '') {
			dispatch(registerGuest(guestEmail))
		}
	}

	return (
		<FormContainer>
			{/* <h1>ゲスト</h1> */}

			{registerError && (
				<Message variant='danger'>{registerError}</Message>
			)}
			{registerLoading && <Loader />}
			<Form onSubmit={guestHandler}>
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
						value={guestEmail}
						onChange={(e) => setGuestEmail(e.target.value)}
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
					<Link className='btn btn-light my-3' to='/login'>
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

export default LoginScreen
