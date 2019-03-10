import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { getBabelConfig, getCssOptions } from '../loaders'
import { getCompilerName, getEnvColor } from '../utils'

export default async function base(env, options) {
	const { webpack: { alias } } = options
	const name = getCompilerName(env)
	const babelConfig = await getBabelConfig(env, options)
	const cssConfig = getCssOptions(env)

	return {
		name,
		mode: env.dev ? 'development' : 'production',
		module: {
			strictExportPresence: true,
			rules: [
				{
					test: /\.(js|jsx|mjs)$/,
					use: {
						loader: 'babel-loader',
						options: babelConfig
					}
				},
				{
					test: /\.css$/,
					use: cssConfig
				}
			]
		},
		resolve: {
			alias
		},
		plugins: [
			new WebpackBar({
				color: getEnvColor(env),
				name,
				reporters: ['basic', 'fancy', 'profile', 'stats']
			})
		]
	}
}
