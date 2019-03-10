import webpack from 'webpack'
import ExtractPlugin from 'mini-css-extract-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import base from './base'

export default function client(options) {
	const { paths } = options
	const env = { ...options.env, legacy: !!options.legacy, server: false }
	const config = base(env, options)

	config.target = 'web'
	config.entry = env.legacy
		? ['whatwg-fetch', paths.clientEntry]
		: { main: paths.clientEntry }

	config.output = {
		chunkFilename: env.dev ? '[name].js' : '[chunkhash:8].js',
		filename: env.dev ? '[name].js' : '[chunkhash:8].js',
		path: options.paths.clientOutput,
		publicPath: options.paths.publicPath
	}

	if (env.dev) {
		config.pathinfo = true
		config.plugins = [
			!!options.webpack.hot && new webpack.HotModuleReplacementPlugin({
				multiStep: options.mode === 'universal'
			})
		].filter(Boolean)

		return config
	}

	config.plugins = [
		...config.plugins,
		new webpack.HashedModuleIdsPlugin(),
		!env.dev && new ExtractPlugin({
			allChunks: true,
			filename: '[contenthash:8].css'
		}),
		options.mode === 'spa' && new HtmlPlugin({
			filename: `index${env.legacy ? '-legacy' : ''}.html`,
			template: paths.template
		})
	].filter(Boolean)

	return config
}
