import { client, server } from './configs'

export default function createConfig(options) {
	if (options.mode === 'spa') {
		return client(options)
	}

	if (options.mode === 'server') {
		return server(options)
	}

	if (options.mode === 'universal') {
		return [
			client(options),
			server(options)
		]
	}

	return client(options)
}
