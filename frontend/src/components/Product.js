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
					style={{ minHeight: '200px', width: '100%' }}
					src={product.image}
					alt='旨い塩商品'
					variant='top'
				/>

				<Card.Body>
					<Card.Title as='div'>{product.name}</Card.Title>
					<Card.Text as='div'>
						<Rating
							value={product.rating}
							text={`${product.numReviews}個の評価`}
						/>
					</Card.Text>
					<Card.Text as='div'>
						{product.price && (
							<h3
								style={{
									fontSize: 'larger',
									marginTop: '1rem',
								}}
							>
								¥&nbsp;{product.price.toLocaleString()}{' '}
								<span className='tax-include-sm'>税込</span>
							</h3>
						)}
					</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Product
