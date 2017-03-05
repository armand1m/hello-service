const { send } = require('micro')
const { router, get } = require('microrouter')

const Info = require('./info')

const hello = async (req, res) => {
  return send(res, 200, await Promise.resolve(`Hello ${req.params.who}: ${Info.host}`))
}

const health = async (req, res) => {
  return send(res, 200, {
    status: "healthy"
  })
}

module.exports = router(
  get('/:who', hello),
  get('/health', health)
)