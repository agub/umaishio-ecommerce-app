import React from 'react'
import { Container } from 'react-bootstrap'
import ContactScreen from './ContactScreen'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'

const LandingScreen = () => {
	return (
		<div style={{ backgroundColor: '#f5f5f5' }}>
			<Page1 />
			<Container>
				<Page2 />
				<ContactScreen />
			</Container>
		</div>
	)
}

export default LandingScreen