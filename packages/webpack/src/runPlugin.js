export default function runPlugin(plugin, config, options) {
	if (typeof plugin === 'string') {
		return runPlugin({ name: plugin }, config, options)
	}

	if (typeof plugin === 'function') {
		return plugin(config, options)
	}

	const pluginName = `frost-plugin-${plugin.name}`
	const frostPlugin = require(pluginName)

	if (!frostPlugin) {
		throw new Error(`Unable to find ${pluginName}`)
	}

	return frostPlugin(config, options, plugin.options)
}
