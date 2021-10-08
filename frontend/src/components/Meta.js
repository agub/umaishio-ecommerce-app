import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keyword' content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	title: '旨い塩',
	description: '旨い塩オンラインショップ',
	keywords: '旨い塩,味噌,健康塩,ビーガン,塩,無添加',
}

export default Meta
