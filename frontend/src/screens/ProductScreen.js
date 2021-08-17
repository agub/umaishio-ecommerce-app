import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
	Form,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(0)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				戻る
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={5} className='product-page-section'>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={4} className='product-page-section'>
						<ListGroup variant='flush'>
							<ListGroup.Item as='h3'>
								{product.name}
							</ListGroup.Item>
							<ListGroup.Item>
								{product.rating && (
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								)}
							</ListGroup.Item>
							<ListGroup.Item>¥{product.price}</ListGroup.Item>
							<ListGroup.Item>
								{product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={3} className='product-page-section'>
						{/* from here > */}
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col className='product-page-section'>
											値段:{' '}
										</Col>
										<Col className='product-page-section'>
											<strong>¥{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col className='product-page-section'>
											Status:{' '}
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
													className='form-control-select'
													style={{
														padding:
															'0.75rem 0.2rem 0.75rem 0.4rem',
													}}
													as='select'
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
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
										disabled={product.countInStock === 0}
									>
										カートへ入れる
									</Button>
									　
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
