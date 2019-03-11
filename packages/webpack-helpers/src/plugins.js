export function getPlugins(config) {
	return (config.plugins || [])
		.map((plugin, index) => ({ index, plugin }))
}

export function getPluginsByName(config, name) {
	return getPlugins(config)
		.filter(({ plugin }) => plugin && plugin.constructor && plugin.constructor.name === name)
}

export function getPluginsByType(config, type) {
	return getPlugins(config)
		.filter(({ plugin }) => plugin instanceof type)
}
