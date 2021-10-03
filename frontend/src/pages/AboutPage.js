import React from 'react'
import { Card, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import x_logo from '../data/images/x_logo.png'
import umaishio from '../data/images/Umaishio.png'
import useWindowSize from '../hooks/useWindowSize'

const AboutPage = () => {
	const size = useWindowSize()
	return (
		<>
			<div
				className={
					size.width > 991
						? 'aboutPage-wrap'
						: 'aboutPage-wrap-mobile'
				}
			>
				<div
					// className='about-image-wrap about-image-wrap-mobile'
					className={
						size.width > 991
							? 'about-image-wrap'
							: 'about-image-wrap-mobile'
					}
				>
					<Link to={'/shop'}>
						<Image
							src={umaishio}
							alt='umaishio'
							variant='top'
							fluid
							style={{ width: '300px' }}
						/>
					</Link>
					{size.width > 991 && (
						<Button className='about-purchase-btn'>
							<Link to={'/shop'}>
								<div style={{ color: 'white' }}>
									購入する
									{/* <span style={{ marginLeft: 'auto' }}> */}
									<i className='fas fa-chevron-right fa-position-right'></i>
								</div>
							</Link>
						</Button>
					)}
				</div>
				{/* <div className='about-page-text-wrap'>
					<div>
						<h3>
							<Image
								src={x_logo}
								alt='xlogo'
								variant='top'
								className='page2-card-logo'
							/>
							&nbsp; 私達の旨い塩とは･･･
						</h3>
					</div>
					<div>
						最近注目されている日本のだしの「旨味」はなぜ世界を魅了しているのでしょう？それは単なる美味しさだけではなく、古来より伝承されてきた作り方と古の人々より受け継がれた栄養の賜物の融合だからではないでしょうか。
						私達トビラが旨い塩×シリーズの第一弾でお届けする「旨い塩×味噌」は日本の誇る旨味に、歴史に裏付けされた栄養を加味した自慢の調味塩です。普通の塩としてだけでなく肉や魚の下ごしらえはもちろん、サラダのドレッシングの代わり、またご飯に混ぜて味噌風味のおにぎりにしたり…と様々な料理にお使いいただけます。
						また「旨い塩×味噌」の特徴として、無添加はもちろん、旨味に鰹やイワシなどの動物性食品を使わない事で、ベジタリアン、ヴィーガンの方々にも安心してお使いいただけます。
					</div>
				</div>
		*/}
				<Card
					className={
						size.width > 991 ? 'about-card' : 'about-card-mobile'
					}
				>
					<Card.Body
						className={
							size.width > 991
								? 'about-card-body'
								: 'page2-card-body-mobile'
						}
					>
						<Card.Title
							as='h2'
							className={
								size.width > 991
									? 'about-card-title'
									: 'about-card-title-mobile'
							}
						>
							<Card.Img
								src={x_logo}
								alt='xlogo'
								variant='top'
								className='page2-card-logo'
							/>
							&nbsp;私達の旨い塩とは･･･
						</Card.Title>

						<Card.Text
							as='div'
							className={
								size.width > 767
									? 'page2-card-text'
									: 'page2-card-text-mobile'
							}
						>
							最近注目されている日本のだしの「旨味」はなぜ世界を魅了しているのでしょう？それは単なる美味しさだけではなく、古来より伝承されてきた作り方と古の人々より受け継がれた栄養の賜物の融合だからではないでしょうか。
							<br />
							<br />
							私達トビラが旨い塩×シリーズの第一弾でお届けする「旨い塩×味噌」は日本の誇る旨味に、歴史に裏付けされた栄養を加味した自慢の調味塩です。普通の塩としてだけでなく肉や魚の下ごしらえはもちろん、サラダのドレッシングの代わり、またご飯に混ぜて味噌風味のおにぎりにしたり…と様々な料理にお使いいただけます。
							<br />
							<br />
							また「旨い塩×味噌」の特徴として、無添加はもちろん、旨味に鰹やイワシなどの動物性食品を使わない事で、ベジタリアン、ヴィーガンの方々にも安心してお使いいただけます。
						</Card.Text>
					</Card.Body>
					{size.width < 991 && (
						<div className='about-purchase-btn-mobile-wrap'>
							<Button className='about-purchase-btn'>
								<Link to={'/shop'}>
									<div style={{ color: 'white' }}>
										購入する
										{/* <span style={{ marginLeft: 'auto' }}> */}
										<i className='fas fa-chevron-right fa-position-right'></i>
									</div>
								</Link>
							</Button>
						</div>
					)}
				</Card>
			</div>
		</>
	)
}

export default AboutPage
