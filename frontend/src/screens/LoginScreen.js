import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ModalContainer from '../components/ModalContainer'
import { login } from '../actions/userActions'
import {
	USER_VERIFY_RESET,
	USER_LOGIN_SUCCESS_RESET,
	USER_UPDATE_RESET,
} from '../constants/userConstants'
import Background from '../data/images/bgc_blur.png'

import '../styles/LoginScreen.scss'
import VerifySuccessModal from '../components/VerifySuccessModal'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [savePassword, setSavePassword] = useState(false)

	const [showPassword, setShowPassword] = useState(false)

	// VerifySuccessModal
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	// VerifySuccessModal
	// VerifySuccessModal
	const [showPwSucess, setShowPwSucess] = useState(false)
	const handlePwClose = () => setShowPwSucess(false)
	// VerifySuccessModal

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo, success: successLogin } = userLogin

	const userVerify = useSelector((state) => state.userVerify)
	const { success } = userVerify

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success: userUpdateSucess } = userUpdateProfile

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			if (successLogin) {
				history.push(redirect)
				dispatch({ type: USER_LOGIN_SUCCESS_RESET })
			} else if (successLogin && redirect) {
				history.push(redirect)
			} else {
				history.push('/shop')
			}
		}
	}, [history, userInfo, dispatch, successLogin]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (success) {
			setShow(true)
			dispatch({
				type: USER_VERIFY_RESET,
			})
		}
		if (userUpdateSucess) {
			setShowPwSucess(true)
			dispatch({
				type: USER_UPDATE_RESET,
			})
		}
	}, [success, userUpdateSucess, dispatch]) //dispatch add

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch({
			type: USER_VERIFY_RESET,
		})
		dispatch(login(email, password, savePassword))
	}

	return (
		<div
			style={{
				backgroundImage: `url(${Background})`,
			}}
			className='bgi-register__g'
		>
			<Meta
				title='旨い塩オンラインショップ　ログインページ'
				description='旨い塩オンラインショップへようこそ'
			/>
			<ModalContainer>
				<h1 className='text-center'>ログイン</h1>

				{error && <Message variant='danger'>{error}</Message>}

				<VerifySuccessModal
					text='Eメールの認証が完了しました。'
					show={show}
					handleClose={handleClose}
				/>
				<VerifySuccessModal
					text='パスワードを変更しました。'
					show={showPwSucess}
					handleClose={handlePwClose}
				/>

				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='email'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								メールアドレス
								<span className='form-asterisk__g'>*</span>
								{/* <span className='shipping-form-icon'>必須</span> */}
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='email'
								placeholder='メールアドレス'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>
						例: umaishio@gmail.com
					</p>
					<Form.Group controlId='password'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								パスワード
								<span className='form-asterisk__g'>*</span>
								{/* <span className='shipping-form-icon'>必須</span> */}
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								className='login-password-input'
								type={showPassword ? 'string' : 'password'}
								placeholder='パスワード'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>

							{showPassword ? (
								<i
									onClick={() =>
										setShowPassword(!showPassword)
									}
									style={{ cursor: 'pointer' }}
									className='fa fa-eye me-2 '
								></i>
							) : (
								<i
									onClick={() =>
										setShowPassword(!showPassword)
									}
									style={{ cursor: 'pointer' }}
									className='fa fa-eye-slash me-2 '
								></i>
							)}
						</div>
					</Form.Group>
					{/* <p className='shipping-form-example__g'>&nbsp;</p> */}
					<div className='login-options-wrap'>
						<span
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<span>
								<input
									type='checkbox'
									value={savePassword}
									onChange={() =>
										setSavePassword(!savePassword)
									}
								></input>
								{/* <Form.Check
									className='mt-3'
									label='パスワードを保存'
									onChange={() =>
										setSavePassword(!savePassword)
									}
									checked={savePassword}
								/> */}
							</span>
							<span>&nbsp;パスワードを保存</span>
						</span>
						<Link to={'/forgot'}>
							<span className='login-forgot-button'>
								パスワードをお忘れた方
							</span>
						</Link>
					</div>
					<Button type='submit' className='next-gradient-btn__g mt-4'>
						<div>
							ログイン
							{/* <span style={{ marginLeft: 'auto' }}> */}
							<i className='fas fa-chevron-right fa-position-right'></i>
						</div>
					</Button>

					{/* <div
						style={{
							width: '100%',
							height: '20px',
							borderBottom: '1px solid black',
							textAlign: 'center',
						}}
					>
						<span
							style={{
								fontSize: '10px',
								backgroundColor: '#F3F5F6',
								marginTop: '20px',
								padding: '20px 0 10px',
							}}
						>
							&nbsp;または&nbsp;
						</span>
					</div> */}
					{/* <Row className='py-3'> */}
					<div className='py-3' style={{ textAlign: 'end' }}>
						<Link
							to={
								redirect
									? `/register?redirect=${redirect}`
									: '/register'
							}
						>
							<span className='login-register-button'>
								新規登録の方はこちら
							</span>
						</Link>
					</div>
					{/* </Row> */}

					{Array.isArray(cartItems) && cartItems.length !== 0 && (
						<>
							<div>
								<p className='login-or'>
									<span>or</span>
								</p>
							</div>
							<p className='text-center'>
								アカウントを作らない場合
							</p>

							<Link
								// to={redirect ? `/guest?redirect=${redirect}` : '/guest'}
								to={'/guestshipping'}
							>
								<button className='login-guest-btn'>
									<span style={{ color: '#E71F7F' }}>
										ゲストして次へ進む
									</span>
									{/* </button> */}
								</button>
							</Link>
						</>
					)}
				</Form>
			</ModalContainer>
		</div>
	)
}

export default LoginScreen
