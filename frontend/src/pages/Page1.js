import React from 'react'
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
		<div
			data-aos='zoom-in'
			data-aos-duration='3000'
			data-aos-easing='ease-in-out-sine'
		>
			<div className='page1-box'>
				{size.width > 767 ? (
					<>
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
					</>
				) : (
					<>
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

				{/* <ImgWithFallback
					webp={bgcwebp}
					fallback={bgc}
					alt='旨い塩シリーズ背景'
					className='page1-bgc'
				/> */}
			</div>
		</div>
	)
}

export default Page1
