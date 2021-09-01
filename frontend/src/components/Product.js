import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded customCard'>
			<Link to={`/product/${product._id}`}>
				<Card.Img
					src={product.image}
					alt={product.image}
					variant='top'
				/>
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews}個の評価`}
					/>
				</Card.Text>
				<Card.Text as='div'>
					<h3 style={{ marginTop: '1rem' }}>
						¥&nbsp;{product.price}
					</h3>
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
