import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import logo from '../data/images/logo.png'

const Footer = () => {
	return (
		<footer style={{ backgroundColor: '#1a1a1a' }}>
			<Container>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Image
						src={logo}
						alt='logo'
						style={{ width: '200px', margin: '20px' }}
					/>
				</div>
				<Row className='text-center py-3'>
					<Col>info@umaishio.com</Col>
				</Row>

				<Row className='text-center py-3'>
					<Col>Copyright &copy; 旨い塩</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
