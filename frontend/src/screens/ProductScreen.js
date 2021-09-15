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
			{/* <Link className='btn btn-light my-3' to='/'>
				戻る
			</Link> */}
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
						<Col lg={6} md={12}>
							{/* <div className='product-page-img'> */}
							<Image
								src={product.image}
								alt={product.name}
								fluid
							/>
							{/* </div> */}
						</Col>
						<Col lg={6} md={12}>
							<div className='product-page-section'>
								<ListGroup variant='flush'>
									<h3>{product.name}</h3>
									<div className='product-page-review-stock-wrap'>
										{product.rating && product.numReviews && (
											<>
												<Rating
													value={product.rating}
													text={`( ${product.numReviews} )`}
													showArrow
													showComment={showComment}
													setShowComment={
														setShowComment
													}
													directToReview={
														directToReview
													}
												/>
											</>
										)}
										<div className='product-page-stock'>
											{product.countInStock > 0 ? (
												<>
													在庫あり&nbsp;
													<span>
														<i className='fas fa-check'></i>
													</span>
												</>
											) : (
												'在庫なし'
											)}
										</div>
									</div>
									<div className='product-page-description'>
										{product.description}
									</div>
								</ListGroup>
							</div>
							<Col md={12}>
								{/* from here > */}

								<div>
									<div variant='flush' id='reviewComp'>
										{showComment && (
											<div className='product-page-review-wrap'>
												<Row className='product-page-review-container'>
													<Col>
														<h3 className='mt-3'>
															カスタマーレビュー
														</h3>
														<div variant='flush'>
															{product.reviews
																.length ===
																0 && (
																<Message>
																	評価なし
																</Message>
															)}
															{product.reviews.map(
																(review) => (
																	<div
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
																	</div>
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
															{userInfo && (
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
																				className='product-page-review-form'
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
																				className='product-page-review-form'
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
																			className='product-page-button mt-3 w-100'
																			type='submit'
																			variant='primary'
																		>
																			投稿
																		</Button>
																	</Form>
																</>
															)}
														</div>
													</Col>
												</Row>
											</div>
										)}
										<div className='product-page-option-wrap'>
											<Col
												md={3}
												className='product-page-price'
											>
												¥{product.price}
											</Col>
											{product.countInStock > 0 && (
												<Col md={4}>
													{/* <Form.Control
														className='form-select form-control-select'
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
													</Form.Control> */}
													<div className='product-page-crement-wrap'>
														<button
															className='product-page-crement'
															onClick={() => {
																if (qty === 1) {
																	return
																} else {
																	setQty(
																		Number(
																			qty
																		) - 1
																	)
																}
															}}
														>
															<i className='fa fa-minus'></i>
														</button>
														<select
															className='form-select form-control-select'
															value={qty}
															onChange={(e) =>
																setQty(
																	e.target
																		.value
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
																	value={
																		x + 1
																	}
																>
																	{x + 1}
																</option>
															))}
														</select>
														<button
															className='product-page-crement'
															onClick={() =>
																setQty(
																	Number(
																		qty
																	) + 1
																)
															}
														>
															<i className='fas fa-plus'></i>
														</button>
													</div>
												</Col>
											)}
											<Col md={5}>
												<Button
													onClick={addToCartHandler}
													className='product-page-button w-100'
													type='button'
													disabled={
														product.countInStock ===
														0
													}
												>
													<div
														style={{
															display: 'flex',
															justifyContent:
																'space-between',
														}}
													>
														<span>
															カートへ入れる&nbsp;&nbsp;
														</span>
														<span>
															<i className='fas fa-plus'></i>
														</span>
													</div>
												</Button>
											</Col>
										</div>
									</div>
								</div>
							</Col>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
