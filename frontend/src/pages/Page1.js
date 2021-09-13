import React from 'react'
import { Image } from 'react-bootstrap'
import bgc from '../data/images/bgc1.png'
import bgcMobile from '../data/images/背景横.png'
import logo_square from '../data/images/logo_square.png'
import useWindowSize from '../hooks/useWindowSize'

const Page1 = () => {
	const size = useWindowSize()
	return (
		<div className='page1-box'>
			{size.width > 767 ? (
				<>
					<Image src={bgc} alt='bgc' className='page1-bgc' />
					<Image
						src={logo_square}
						alt='logo'
						className='page1-logo'
					/>
				</>
			) : (
				<>
					<Image
						src={bgcMobile}
						alt='bgc'
						className='page1-bgc-mobile'
					/>
					<Image
						src={logo_square}
						alt='logo'
						className='page1-logo-mobile'
					/>
				</>
			)}
		</div>
	)
}

export default Page1
