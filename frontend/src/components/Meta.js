import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			{/* <meta name='keyword' content={keywords} /> */}
		</Helmet>
	)
}

Meta.defaultProps = {
	title: '旨い塩',
	description: '旨い塩オンラインショップ',
}

export default Meta
