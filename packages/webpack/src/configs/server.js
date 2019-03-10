import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import base from './base'

export default function server(options) {
	const { paths } = options
	const env = { ...options.env, legacy: false, server: true }
	const config = base(env, options)

	config.node = {
		__console: false,
		__dirname: false,
		__filename: false
	}

	config.entry = [paths.serverEntry]
	config.output = {
		filename: 'server.js',
		libraryTarget: 'commonjs2',
		path: paths.serverOutput,
		publicPath: paths.publicPath
	}

	config.externals = [
		nodeExternals({
			whitelist: [
				env.dev && options.mode === 'universal'
					? 'webpack/hot/poll?300'
					: null,
				...options.webpack.externals
			].filter(Boolean)
		})
	]

	config.plugins = [
		...config.plugins,
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	]

	if (env.dev) {
		config.watch = true
		config.entry.unshift('webpack/hot/poll?300')

		config.plugins = [
			...config.plugins,
			new webpack.HotModuleReplacement()
		]
	}

	return config
}
