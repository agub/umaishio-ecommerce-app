import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
// import products from '../products'

const ProductScreen = ({ match }) => {
	// const product = products.find((p) => p._id === match.params.id)
	const [product, setProduct] = useState({})
	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${match.params.id}`)
			setProduct(data)
		}
		fetchProduct()
	}, [match])
	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				戻る
			</Link>
			<Row>
				<Col md={5}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={4}>
					<ListGroup variant='flush'>
						<ListGroup.Item as='h3'>{product.name}</ListGroup.Item>
						<ListGroup.Item>
							{product.rating && (
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							)}
						</ListGroup.Item>
						<ListGroup.Item>¥{product.price}</ListGroup.Item>
						<ListGroup.Item>{product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>値段: </Col>
									<Col>
										<strong>¥{product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status: </Col>
									<Col>
										{product.countInStock > 0
											? '在庫あり'
											: '在庫なし'}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									// className='my-auto cl-12'
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
		</>
	)
}

export default ProductScreen
