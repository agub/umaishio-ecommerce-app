import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const [modify, setModify] = useState(true)

	const dispatch = useDispatch()
	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user || !user.name) {
				dispatch(getUserDetails('profile'))
				dispatch(listMyOrders())
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [history, userInfo, user, dispatch])

	const reLoad = () => {
		if (userInfo) {
			dispatch(listMyOrders())
		}
	}
	const submitHandler = (e) => {
		setMessage('')
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('パスワードが一致しません')
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name,
					email,
					password,
				})
			)
			setPassword('')
			setConfirmPassword('')
		}
	}

	return (
		<Row>
			<Col md={3} className='mb-4'>
				<h2>プロフィール</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>変更しました</Message>}
				{/* {loading && <Loader />} */}
				{modify ? (
					<>
						<Card className='mt-4 mb-4'>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col md={12}>名前:</Col>
										<Col>
											<p>{name}</p>
										</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col md={12}>Email:</Col>
										<Col>
											<p>{email}</p>
										</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
						<Button
							onClick={() => setModify(!modify)}
							variant='danger'
							className='w-100'
						>
							ユーザー情報変更
						</Button>
					</>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>名前</Form.Label>
							<Form.Control
								type='name'
								placeholder='名前'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label className='mt-2'>パスワード</Form.Label>
							<Form.Control
								type='password'
								placeholder='パスワード'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='confirmPassword'>
							<Form.Label className='mt-2'>
								確認パスワード
							</Form.Label>
							<Form.Control
								type='password'
								placeholder='確認パスワード'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							></Form.Control>
						</Form.Group>
						<Button
							type='submit'
							variant='primary'
							className='mt-3  w-100'
							disabled={
								loading || password !== ''
									? null
									: email === userInfo.email
									? name === userInfo.name
									: null
							}
						>
							変更
						</Button>
						<Button
							variant
							className='mt-3 w-100'
							onClick={() => {
								setModify(!modify)
								dispatch({
									type: USER_UPDATE_PROFILE_RESET,
								})
							}}
						>
							キャンセル
						</Button>
					</Form>
				)}
			</Col>

			<Col md={9}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<h2>
						注文一覧
						{/* <span style={{ marginLeft: 'auto', width: 'auto' }}> */}
						{/* </span> */}
					</h2>
					<Button
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '50%',
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						variant='light'
						onClick={() => reLoad()}
					>
						<i className='fas fa-sync'></i>
					</Button>
				</div>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped bordered hover className='table-sm'>
						<thead>
							<tr>
								{/* <th>ID</th> */}
								<th>注文日</th>
								{/* <th>合計</th> */}
								<th>支払い</th>
								<th>配送</th>
								<th style={{ width: '80px' }}></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									{/* responsive */}
									{/* <td>{order._id.substring(0, 7)}...</td> */}
									<td>{order.createdAt.substring(0, 10)}</td>
									{/* <td>¥{order.totalPrice}</td> */}
									<td>
										{
											order.isPaid ? (
												<div>支払い済み</div>
											) : (
												<div>
													{order.isBankTransfer ? (
														<div>
															確認中...
															{/* <i
																className='fas fa-times'
																style={{
																	color:
																		'red',
																}}
															></i> */}
														</div>
													) : (
														<i
															className='fas fa-times'
															style={{
																color: 'red',
															}}
														></i>
													)}
												</div>
											)
											// <i
											// 	className='fas fa-times'
											// 	style={{ color: 'red' }}
											// ></i>
										}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i
												className='fas fa-times'
												style={{
													color: 'red',
													padding: '0 10px',
												}}
											></i>
										)}
									</td>
									<td>
										<LinkContainer
											to={`/order/${order._id}`}
										>
											<Button
												className='w-100 btn-sm'
												variant='light'
											>
												詳細
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	)
}

export default ProfileScreen
