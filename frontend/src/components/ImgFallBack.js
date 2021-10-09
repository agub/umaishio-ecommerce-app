const ImgWithFallback = ({
	webp,
	fallback,
	type = 'image/webp',
	alt,
	...delegated
}) => {
	return (
		<picture>
			<source srcSet={webp} type={type} alt={alt} />
			<img src={fallback} {...delegated} alt={alt} />
		</picture>
	)
}

export default ImgWithFallback
