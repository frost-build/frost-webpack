const chalk = require('chalk')
const codeFrame = require('babel-code-frame')
const { readFile } = require('fs-extra')
const { rollup } = require('rollup')

async function handleErrors(error) {
	if (!error.code) {
		console.error(error)
		return
	}

	console.error(
		`\x1b[31-- ${error.code}${error.plugin ? `(${error.plugin})` : ''} --`
	)
	console.error(error.stack)

	if (error.loc && error.loc.file) {
		const { column, file, line } = error.loc
		const rawLines = await readFile(file, 'utf-8')
		const frame = codeFrame(rawLines, line, column + 1, {
			highlightCode: true
		})
		console.error(frame)
	} else if (error.codeFrame) {
		console.error(error.codeFrame)
	}
}

module.exports = async function createBundle({ config, output }) {
	console.log(`Building ${chalk.magenta(output.name)} in format ${chalk.cyan(output.format)}`)
	try {
		const result = await rollup(config)
		await result.write(output)
	} catch (err) {
		console.log('ERROR:')
		await handleErrors(err)
		throw err
	}

	console.log(chalk.green(`${output.name} built successfully in ${output.format}`))
}
