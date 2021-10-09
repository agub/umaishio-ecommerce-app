import React from 'react'
import { Image } from 'react-bootstrap'
import bgc from '../data/images/bgc1.png'
import bgcwebp from '../data/images/bgc1.webp'
import bgcMobile from '../data/images/bgcVertical.png'
import bgcMobilewebp from '../data/images/bgcVertical.webp'
import logo_square from '../data/images/logo_square.png'
import logo_squarewebp from '../data/images/logo_square.webp'
import useWindowSize from '../hooks/useWindowSize'
import ImgWithFallback from '../components/ImgFallBack'
const Page1 = () => {
	const size = useWindowSize()
	return (
		<div className='page1-box'>
			{size.width > 767 ? (
				<>
					{/* <Image src={bgc} alt='bgc' className='page1-bgc' /> */}
					<ImgWithFallback
						webp={bgcwebp}
						fallback={bgc}
						alt='旨い塩シリーズ背景'
						className='page1-bgc'
					/>
					<ImgWithFallback
						webp={logo_squarewebp}
						fallback={logo_square}
						alt='旨い塩ロゴ'
						className='page1-logo'
					/>
					{/* <Image
						src={logo_square}
						alt='旨い塩ロゴ'
						className='page1-logo'
					/> */}
				</>
			) : (
				<>
					{/* <Image
						src={bgcMobile}
						alt='旨い塩背景携帯'
						className='page1-bgc-mobile'
					/> */}
					{/* <Image
						src={logo_square}
						alt='旨い塩背景'
						className='page1-logo-mobile'
					/> */}
					<ImgWithFallback
						webp={bgcMobilewebp}
						fallback={bgcMobile}
						alt='旨い塩背景携帯'
						className='page1-bgc-mobile'
					/>
					<ImgWithFallback
						webp={logo_squarewebp}
						fallback={logo_square}
						alt='旨い塩ロゴ携帯'
						className='page1-logo-mobile'
					/>
				</>
			)}
		</div>
	)
}

export default Page1
