const { send } = require('micro')
const { router, get } = require('microrouter')

const Info = require('./info')

const hello = async (req, res) => send(res, 200, `Hello to ${Info.host}, ${req.params.who}!`)

module.exports = router(
  get(`/${Info.name}/:who`, hello)
)
