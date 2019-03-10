import { exists } from 'fs-extra'
import getDefaultConfig from './getDefaultConfig'

export default async function getBabelConfig(env, options) {
	const { paths } = options
	let babelOptions = {
		presets: [],
		plugins: []
	}

	try {
		const babelRc = await exists(paths.babelRc)
		console.log('Using the babel config defined in babel file')
		babelOptions.babelrc = true
	} catch (err) {
		console.log('Using default babelConfig instead')
		babelOptions = getDefaultConfig(env)
	}

	return babelOptions
}
