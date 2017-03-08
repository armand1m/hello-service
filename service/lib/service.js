const { router, get } = require('microrouter')

const Info = require('./info')

module.exports = router(
  get(`/${Info.name}/:who`, require('./function'))
)
