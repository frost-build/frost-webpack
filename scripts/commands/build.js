const chalk = require('chalk')
const { configureBundles, createBundle, createConfig } = require('../rollup')
const { parsePackages } = require('./utils')

async function build(options) {
	const packages = await parsePackages()
}
