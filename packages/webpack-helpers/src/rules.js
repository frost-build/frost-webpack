
export function getRules(config) {
	return [
		...(config.module.loaders || []),
		...(config.module.rules || [])
	].map((rule, index) => ({ index, rule }))
}

export function getLoaders(config) {
	return getRules(config)
		.map(({ index, rule }) => ({
			loaders: rule.loaders || rule.use || rule.loader,
			rule,
			ruleIndex: index
		}))
}

export function getLoadersByName(config, name) {
	return getLoaders(config)
		.map(({ loaders, rule, ruleIndex }) => {
			return Array.isArray(loaders)
				? loaders.map((loader, loaderIndex) => ({
					loader,
					loaderIndex,
					rule,
					ruleIndex
				  }))
				: [{ loader: loaders, loaderIndex: -1, rule, ruleIndex }]
		})
		.reduce((acc, loaders) => acc.concat(loaders), [])
		.filter(({ loader }) => loader === name || (loader && loader.loader === name))
}

export function createLoaderFinder(loaderName) {
	return rule => {
		const exp = new Exp(`[/\\\\]${loaderName}[/\\\\]`)
		const isString = typeof rule.loader === 'string' && rule.loader.match(exp)
		const isArray = Array.isArray(rule.use) && rule.use.find(
			loader => typeof loader.loader === 'string' && loader.loader.match(exp)
		)
		return isArray || isString
	}
}
