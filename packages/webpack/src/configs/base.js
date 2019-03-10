import webpack from 'webpack'
import { getBabelConfig } from '../loaders'
import { getCompilerName } from '../utils'

export default async function base(env, options) {
	const { webpack: { alias } } = options
	const name = getCompilerName(env)
	const babelConfig = await getBabelConfig(env, options)

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
				}
			]
		},
		resolve: {
			alias
		},
		plugins: []
	}
}
