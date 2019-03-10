import ExtractPlugin from 'mini-css-extract-plugin'
import getPostcssOptions from './getPostcssOptions'

function getStyleLoader(dev) {
	return dev ? 'style-loader' : ExtractPlugin.loader
}

function getPostcssLoader(legacy) {
	if (legacy) {
		return {
			loader: require.resolve('postcss-loader')
			options: getPostcssOptions()
		}
	}
	return false
}

export default function getCssOptions({ dev, legacy, server }) {
	const loaders = [{
		loader: require.resolve('css-loader'),
		options: {
			importLoaders: 1
		}
	}]

	if (!server) {
		return [getStyleLoader(dev), ...loaders, getPostcssLoader(legacy)].filter(Boolean)
	}

	return loaders
}
