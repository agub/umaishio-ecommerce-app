import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { addToCart } from '../actions/cartActions'
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const [showComment, setShowComment] = useState(false)

	const [message, setMessage] = useState('')

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const productReviewCreate = useSelector(
		(state) => state.productReviewCreate
	)
	const {
		success: successProductReview,
		error: errorProductReview,
		loading: loadingProductReview,
	} = productReviewCreate

	useEffect(() => {
		if (successProductReview) {
			// alert('review submitted')
			setRating(0)
			setComment('')
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match, successProductReview])

	// const hasReviewed = {
	// 	if(userInfo) {
	// 		product.reviews.find((r) => r.user === userInfo._id)
	// 	},
	// }

	const directToReview = () => {
		document.getElementById('reviewComp').scrollIntoView()
	}

	const addToCartHandler = () => {
		dispatch(addToCart(product._id, qty))
		setMessage('買い物カゴへ追加しました。')
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(createProductReview(match.params.id, { rating, comment }))
	}

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				戻る
			</Link>
			{message && (
				<Message variant='success'>
					{message} <Link to='/cart'>購入手続きへ</Link>
				</Message>
			)}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6} className='product-page-section'>
							<Image
								src={product.image}
								alt={product.name}
								fluid
							/>
						</Col>
						<Col md={3} className='product-page-section'>
							<ListGroup variant='flush'>
								<ListGroup.Item as='h3'>
									{product.name}
								</ListGroup.Item>
								<ListGroup.Item>
									{product.rating && product.numReviews && (
										<>
											<Rating
												value={product.rating}
												text={`${product.numReviews} 個の評価`}
												showArrow
												showComment={showComment}
												setShowComment={setShowComment}
												directToReview={directToReview}
											/>
										</>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									¥{product.price}
								</ListGroup.Item>
								<ListGroup.Item>
									{product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={3} className='product-page-section'>
							{/* from here > */}

							<Card>
								<ListGroup variant='flush' id='reviewComp'>
									{showComment && (
										<>
											<ListGroup.Item
												className='mb-3'
												variant='flush'
											>
												<Row>
													<Col>
														<h3 className='mt-3'>
															カスタマーレビュー
														</h3>
														<ListGroup variant='flush'>
															{product.reviews
																.length ===
																0 && (
																<Message>
																	評価なし
																</Message>
															)}
															{product.reviews.map(
																(review) => (
																	<ListGroup.Item
																		key={
																			review._id
																		}
																	>
																		<strong>
																			{
																				review.name
																			}
																		</strong>
																		<Rating
																			value={
																				review.rating
																			}
																		/>
																		<p
																			style={{
																				'fontSize':
																					'0.7rem',
																			}}
																		>
																			{review.createdAt.substring(
																				0,
																				10
																			)}
																		</p>
																		<p>
																			{
																				review.comment
																			}
																		</p>
																	</ListGroup.Item>
																)
															)}

															{loadingProductReview && (
																<Loader />
															)}
															{errorProductReview && (
																<Message variant='danger'>
																	{
																		errorProductReview
																	}
																</Message>
															)}
															{
																userInfo && (
																	// !hasReviewed ? (
																	<>
																		{/* <h2 className='mt-3'>
																			レビュー
																		</h2> */}
																		{successProductReview && (
																			<Message variant='success'>
																				レビューを書き込みました。
																			</Message>
																		)}
																		<Form
																			onSubmit={
																				submitHandler
																			}
																		>
																			<Form.Group controlId='rating'>
																				<Form.Label>
																					評価
																				</Form.Label>
																				<Form.Control
																					as='select'
																					value={
																						rating
																					}
																					onChange={(
																						e
																					) =>
																						setRating(
																							e
																								.target
																								.value
																						)
																					}
																				>
																					<option value=''>
																						選択してください
																					</option>
																					<option value='1'>
																						★
																					</option>
																					<option value='2'>
																						★★
																					</option>
																					<option value='3'>
																						★★★
																					</option>
																					<option value='4'>
																						★★★★
																					</option>
																					<option value='5'>
																						★★★★★
																					</option>
																				</Form.Control>
																			</Form.Group>
																			<Form.Group controlId='comment'>
																				<Form.Label>
																					コメント
																				</Form.Label>
																				<Form.Control
																					as='textarea'
																					row='3'
																					value={
																						comment
																					}
																					onChange={(
																						e
																					) =>
																						setComment(
																							e
																								.target
																								.value
																						)
																					}
																				></Form.Control>
																			</Form.Group>

																			<Button
																				disabled={
																					loadingProductReview ||
																					comment ===
																						''
																				}
																				className='w-100 mt-2'
																				type='submit'
																				variant='primary'
																			>
																				投稿
																			</Button>
																		</Form>
																	</>
																)
																// ) : null
																// : (
																// 	<Message>
																// 		<Link to='/login'>
																// 			ログイン
																// 		</Link>
																// 		後にレビューを記入できます
																// 	</Message>
																// )
															}
															{/* </ListGroup.Item> */}
														</ListGroup>
													</Col>
												</Row>
											</ListGroup.Item>
										</>
									)}
									<ListGroup.Item>
										<Row>
											<Col className='product-page-section'>
												値段:{' '}
											</Col>
											<Col className='product-page-section'>
												<strong>
													¥{product.price}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col className='product-page-section'>
												在庫状況:{' '}
											</Col>
											<Col className='product-page-section'>
												{product.countInStock > 0
													? '在庫あり'
													: '在庫なし'}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col className='product-page-section'>
													個数:
												</Col>
												<Col className='product-page-section'>
													<Form.Control
														className='form-select form-control-select__g'
														style={{
															padding:
																'0.75rem 0.2rem 0.75rem 0.4rem',
														}}
														as='select'
														value={qty}
														onChange={(e) =>
															setQty(
																e.target.value
															)
														}
													>
														{[
															...Array(
																product.countInStock
															).keys(),
														].map((x) => (
															<option
																key={x + 1}
																value={x + 1}
															>
																{x + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className='btn my-20 w-100 custombtn'
											type='button'
											disabled={
												product.countInStock === 0
											}
										>
											カートへ入れる
										</Button>
										　
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
