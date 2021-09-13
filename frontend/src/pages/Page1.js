import React from 'react'
import { Image } from 'react-bootstrap'
import bgc from '../data/images/bgc1.png'
import logo_square from '../data/images/logo_square.png'

const Page1 = () => {
	return (
		<div className='box'>
			<Image src={bgc} alt='bgc' className='page1-bgc' />
			<Image src={logo_square} alt='logo' className='page1-logo' />
		</div>
	)
}

export default Page1
