const baseConfig = {
	presets: [],
	plugins: [
		['@babel/plugin-proposal-object-rest-spread'],
		['@babel/plugin-proposal-class-properties']
	]
}

const getLegacyConfig = config => ({
	...config,
	presets: [
		['@babel/preset-env', {
			modules: 'commonjs',
			useBuiltIns: true
		}],
		...config.presets
	]
})

const getServerConfig = config => ({
	...getLegacyConfig(config),
	plugins: [
		...config.plugins,
		['babel-plugin-syntax-dyanmic-import-node']
	]
})

const getClientConfig = config => ({
	...config,
	presets: [
		['@babel/preset-env', {
			modules: false
		}],
		...config.presets
	],
	plugins: [
		...config.plugins,
		['@babel/plugin-syntax-dyanmic-import']
	]
})

export default function getDefaultConfig({ legacy, server }) {
	if (server) {
		return getLegacyConfig(baseConfig)
	}

	if (legacy) {
		return getLegacyConfig(baseConfig)
	}

	return getClientConfig(baseConfig)
}
