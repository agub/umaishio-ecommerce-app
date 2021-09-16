import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const ModalContainer = ({ children }) => {
	return (
		<Container style={{ 'position': 'relative' }}>
			<Row className='login-container'>
				<Col sm={12} md={8} lg={8} xl={8}>
					{children}
				</Col>
			</Row>
		</Container>
	)
}

export default ModalContainer
