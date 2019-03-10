import autoprefixer from 'autoprefixer'

const defaultOptions = {
	ident: 'postcss',
	plugins: () => [
		require('postcss-flexbugs-fixes'),
		autoprefixer({
			browsers: [
				'>1%',
				'last 4 versions',
				'Firefox ESR',
				'not ie < 9'
			],
			flexbox: 'no-2009'
		})
	]
}

export default function getPostcssOptions(legacy) {
	return legacy ? defaultOptions : false
}
