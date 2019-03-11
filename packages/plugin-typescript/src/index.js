import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { makeLoaderFinder } from 'frost-webpack-utils'

const babelFinder = makeLoaderFinder('babel-loader')
const eslintFinder = makeLoaderFind('eslint-loader')

const defaultOptions = {
	forkTsChecker: {

	},
	tsLoader: {
		transpileOnly: true,
		expirimentalWatchApi: true
	},
	useEslint: true,
	useTsLoader: true,
}

export default function tsPlugin(baseConfig, options, userOptions = {}) {


}
