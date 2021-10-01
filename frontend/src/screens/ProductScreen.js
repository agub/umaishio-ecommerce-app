import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { addToCart } from '../actions/cartActions'
import { listProductDetails } from '../actions/productActions'

import CustomerReview from '../components/CustomerReview'

import '../styles/ProductScreen.scss'

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)

	const [showComment, setShowComment] = useState(false)

	const [message, setMessage] = useState('')

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

	const directToReview = () => {
		document.getElementById('reviewComp').scrollIntoView()
	}

	const addToCartHandler = () => {
		dispatch(addToCart(product._id, qty))
		setMessage('買い物カゴへ追加しました。')
		history.push(`/cart/${match.params.id}?qty=${qty}`)
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
									<h3 className='product-page-name'>
										{product.name}
									</h3>
									<div>¥{product.price}</div>

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
											<CustomerReview
												product={product}
												match={match}
												userInfo={userInfo}
											/>
										)}
										<div className='product-page-option-wrap'>
											{/* <Col
												md={3}
												sm={2}
												className='product-page-price'
											>
												¥{product.price}
											</Col> */}
											{product.countInStock > 0 && (
												<Col
													style={{
														display: 'flex',
														justifyContent: 'end',
													}}
													md={4}
													xs={4}
												>
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
															className='form-select form-control-select__g'
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
											<Col md={6} xs={8}>
												<Button
													onClick={addToCartHandler}
													className='product-page-button'
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
															カートへ追加
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
