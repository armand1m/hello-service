const { send } = require('micro')
const { router, get } = require('microrouter')

const { uri, status } = require('./info')

const health = (req, res) => send(res, 200, { status: "healthy" })
const main = (req, res) => send(res, 200, { uri })
const notFound = (req, res) => send(res, 404, { error: 404, message: "route not found" })

module.exports = router(
  get('/hello/:who', (req, res) => req.params),
  get('/health', health),
  get('/*', notFound),
  get('/', main)
)
