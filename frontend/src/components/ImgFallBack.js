const ImgWithFallback = ({
	webp,
	fallback,
	type = 'image/webp',
	...delegated
}) => {
	return (
		<picture>
			<source srcSet={webp} type={type} />
			<img src={fallback} {...delegated} />
		</picture>
	)
}

export default ImgWithFallback
