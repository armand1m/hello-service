const Info = require('microservice-info')
const micro = require('micro')
const { send } = micro
const { router, get } = require('microrouter')

const hello = async (req, res) => send(res, 200, `Hello to ${Info.host}, ${req.params.who}!`)

const service = router(
  get(`/${Info.name}/:who`, hello)
)

module.exports = {
  start: async port => await micro(service).listen(port),
  stop: async instance => await Promise.resolve()
}
