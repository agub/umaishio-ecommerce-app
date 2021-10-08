import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'
import logo from '../data/images/logo.png'

const Footer = () => {
	return (
		<footer style={{ backgroundColor: '#1a1a1a' }}>
			<Container>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Image
						src={logo}
						alt='旨い塩ロゴ'
						style={{ width: '200px', margin: '20px' }}
					/>
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Link to='/rules'>
						<p
							// className='text-center'
							style={{ color: 'white', fontSize: 10 }}
						>
							<br />
							特定商取引法に基づく表記はこちらから
							<br />
						</p>
					</Link>
				</div>
				<Row
					style={{ color: 'white', fontSize: 10 }}
					className='text-center pb-3'
				>
					<Col>株式会社トビラ Copyright &copy; 旨い塩</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
