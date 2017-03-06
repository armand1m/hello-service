const { send } = require('micro')
const { router, get } = require('microrouter')

const Info = require('./info')

const hello = async (req, res) => {
  return send(res, 200, await Promise.resolve(`Hello to ${Info.host}, ${req.params.who}!`))
}

const health = async (req, res) => {
  return send(res, 200, {
    status: "healthy"
  })
}

module.exports = router(
  get('/_v1/:who', hello),
  get('/_v1/health', health)
)
