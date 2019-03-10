const path = require('path')

module.exports = function createConfig(bundle) {
	const config = {
		input: bundle.entry,
		onwarn: warning => {
			if (typeof warning.code === 'string') {
				console.error(`\n${warning.code}\n`)
				process.exit(1)
			} else {
				console.warn((warning.message || warning))
			}
		},
		external: dep => {
			if (/\0/.test(dep)) {
				return false
			}
			if (dep === bundle.entry) {
				return false
			}
			if (path.isAbsolute(dep)) {
				const Root = path.resolve(bundle.entry, '..')
				const relativePath = path.relative(Root, dep)
				return Boolean(/node_modules/.exec(relativePath))
			}
			return dep.charAt(0) !== '.'
		},
		plugins: [
			nodeResolve({
				extensions: ['.js', '.json'],
				jsnext: true,
				main: true,
				module: true
			})
		]
	}

	const output = {
		file: bundle.file,
		format: bundle.format,
		name: bundle.name,
		sourceMap: false,
		banner: bundle.isBinary ? '#!/usr/bin/env node\n\n' : ''
	}

	return { config, output }
}
