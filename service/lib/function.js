const { send } = require('micro')
const Info = require('./info')

module.exports = async (req, res) => {
	let body = {
		host: Info.host,
		message: `Hello, ${req.params.who}!`
	}
	
	return send(res, 200, body)
}
