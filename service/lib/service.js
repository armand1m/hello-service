const { send } = require('micro')
const { router, get } = require('microrouter')

const Info = require('./info')

const hello = (req, res) => send(res, 200, `Hello ${ req.params.who }: ${ Info.host }`)

const health = (req, res) => send(res, 200, { status: "healthy" })

const main = (req, res) => send(res, 200, { uri: Info.uri })

const notFound = (req, res) => send(res, 404, 'Not found route')

module.exports = router(
  get('/', main),
  get(`/api/:who`, hello),
  get(`/api/health`, health),
  get('/*', notFound)
)
