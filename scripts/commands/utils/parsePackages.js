const { read } = require('fs-extra')

module.exports = async function parsePackages(dir, args) {
	const packages = await read(dir)
	return packages.reduce((acc, curr) => {
		if (args.entries && args.entries.length > 0) {
			if (args.entries.includes(curr)) {
				acc.push(curr)
			}
		} else {
			acc.push(curr)
		}

		return acc
	}, [])
}
