export default function getEnvColor({ legacy, server }) {
	if (server) {
		return 'orange'
	}
	if (legacy) {
		return 'green'
	} 

	return 'blue'
}
