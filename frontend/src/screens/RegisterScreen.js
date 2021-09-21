import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Background from '../data/images/bgc_blur.png'
import ModalContainer from '../components/ModalContainer'

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const [showPassword, setShowPassword] = useState(false)
	const [confirmShowPassword, setConfirmShowPassword] = useState(false)

	const dispatch = useDispatch()
	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push('/checkemail')
		}
	}, [history, userInfo])

	const submitHandler = (e) => {
		setMessage('')
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('パスワードが一致しません')
		} else {
			dispatch(register(name, email, password))
		}
	}

	return (
		<>
			<div
				style={{
					backgroundImage: `url(${Background})`,
				}}
				className='bgi-register__g'
			>
				<ModalContainer>
					<h1 className='text-center'>新規会員の登録</h1>
					{message && <Message variant='danger'>{message}</Message>}
					{error && <Message variant='danger'>{error}</Message>}
					{loading && <Loader />}
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>
								{' '}
								<div className='shipping-form-lable__g'>
									氏名{' '}
									<span className='form-asterisk__g'>*</span>
								</div>
							</Form.Label>
							<div className='form-container-pw-icon__g'>
								<Form.Control
									type='name'
									placeholder='氏名'
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								></Form.Control>
							</div>
						</Form.Group>
						<p className='m-2 shipping-form-example__g'>
							例: 旨い塩 太郎
						</p>
						<Form.Group controlId='email'>
							<Form.Label>
								{' '}
								<div className='shipping-form-lable__g'>
									Email{' '}
									<span className='form-asterisk__g'>*</span>
								</div>
							</Form.Label>
							<div className='form-container-pw-icon__g'>
								<Form.Control
									required
									type='email'
									placeholder='Email'
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
								{' '}
								<div className='shipping-form-lable__g'>
									パスワード{' '}
									<span className='form-asterisk__g'>*</span>
									{/* <span className='shipping-form-icon'>必須</span> */}
								</div>
							</Form.Label>
							<div className='form-container-pw-icon__g'>
								<Form.Control
									type={showPassword ? 'string' : 'password'}
									required
									placeholder='パスワード'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
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
						<p className='m-2 shipping-form-example__g'>&nbsp;</p>
						<Form.Group controlId='confirmPassword'>
							<Form.Label>
								{' '}
								<div className='shipping-form-lable__g'>
									確認パスワード{' '}
									<span className='form-asterisk__g'>*</span>
								</div>
							</Form.Label>
							<div className='form-container-pw-icon__g'>
								<Form.Control
									type={
										confirmShowPassword
											? 'string'
											: 'password'
									}
									required
									placeholder='確認パスワード'
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								></Form.Control>
								{confirmShowPassword ? (
									<i
										onClick={() =>
											setConfirmShowPassword(
												!confirmShowPassword
											)
										}
										style={{ cursor: 'pointer' }}
										className='fa fa-eye me-2 '
									></i>
								) : (
									<i
										onClick={() =>
											setConfirmShowPassword(
												!confirmShowPassword
											)
										}
										style={{ cursor: 'pointer' }}
										className='fa fa-eye-slash me-2 '
									></i>
								)}
							</div>
						</Form.Group>
						{/* <p className='m-2 shipping-form-example__g'>&nbsp;</p> */}

						<Button
							type='submit'
							className='next-gradient-btn__g mt-4'
						>
							<div>
								次へ進む
								{/* <span style={{ marginLeft: 'auto' }}> */}
								<i className='fas fa-chevron-right fa-position-right'></i>
							</div>
						</Button>
						{/* <Link className='btn btn-light my-3' to='/login'>
						戻る
					</Link> */}
					</Form>
					<div className='py-3' style={{ textAlign: 'end' }}>
						<Link to={'/login'}>
							<span className='login-register-button'>
								アカウントをお持ちの方はこちら
							</span>
						</Link>
					</div>

					{/* <Row className='py-3'>
					<Col>
						アカウントをお持ちの方{' '}
						<Link to={'/login'}>ログイン</Link>
					</Col>
				</Row> */}
				</ModalContainer>
			</div>
			{/* <div className='stickyBottom'>asfasdfa</div> */}
			<button exact to='/cart' className='stickyBottom'>
				<span className='home-cartButton'>
					<i
						style={{ marginRight: '4px', marginTop: '5px' }}
						className='fas fa-shopping-cart'
					></i>{' '}
				</span>
			</button>
		</>
	)
}

export default RegisterScreen
