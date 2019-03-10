import { client, server } from './configs'
import runPlugin from './runPlugin'

export default function createConfig(options) {
	let config

	if (options.mode === 'spa') {
		config = client(options)
	}

	if (options.mode === 'server') {
		config = server(options)
	}

	if (options.mode === 'universal') {
		config = [
			client(options),
			server(options)
		]
	}

	if (Array.isArray(options.plugins)) {
		plugins.forEach(plugin => {
			config = runPlugin(
				plugin,
				config,
				options
			)
		})
	}

	return config
}
