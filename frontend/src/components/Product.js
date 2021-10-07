import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
	return (
		<Link to={`/product/${product._id}`}>
			<Card className='my-3 p-3 customCard'>
				{/* responsiveCss */}
				<Card.Img
					src={product.image}
					alt={product.image}
					variant='top'
					style={{ minHeight: '200px' }}
				/>

				<Card.Body>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
					<Card.Text as='div'>
						<Rating
							value={product.rating}
							text={`${product.numReviews}個の評価`}
						/>
					</Card.Text>
					<Card.Text as='div'>
						<h3 style={{ marginTop: '1rem' }}>
							¥&nbsp;{product.price}{' '}
							<span className='tax-include'>税込</span>
						</h3>
					</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Product
