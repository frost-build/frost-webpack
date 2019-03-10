const path = require('path')
const { lstatSync, existsSync } = require('fs-extra')

const packagesDir = path.resolve(process.cwd(), 'packages')
const resolveWith = relative => path.resolve(packagesDir, relative)

const keepDirs = path => lstatSync(
	path.join(packagesDir, path)
).isDirectory()

const ensureEntry = path => existsSync(
	join(packagesDir, `${path}/src/index.js`)
)

const accumulateBundles = (bundles, pkg) => {
	const packageJSON = require(resolveWith(`${pkg}/package.json`))
	const name = packageJSON.name
	const isBinary = packageJSON.bin
	const config = {
		entry: resolveWith(`${pkg}/src/index.js`),
		name
	}

	bundles[name] = bundleTypes.map(type => ({
		...config,
		format: type,
		file: resolveWith(`${pkg}/dist/${name}-${type}.js`)
	}))

	if (isBinary) {
		bundles[name].push({
			...config,
			entry: resolveWith(`${pkg}/src/cli.js`),
			file: resolveWith(`${pkg}/bin/${name}`),
			format: 'cjs',
			isBinary: true
		})
	}

	return bundles
}

module.exports = function configureBundles(packages) {
	return packages
		.filter(keepDirs)
		.filter(ensureEntry)
		.reduce(accumulateBundles, [])
}
