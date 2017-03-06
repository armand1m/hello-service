const micro = require('micro')
const service = require('./service')
const Info = require('./info')
const Events = require('./events')

class Server {
  async start() {
    try {
      await micro(service).listen(Info.port)

      Events.onServerRunning(Info.uri)

      this.setTerminationHandlers()
    } catch (e) {
      Events.doErrorExit(e)
    }
  }

  terminate() {
    try {
      Events.doSafeExit()
    } catch (e) {
      Events.doErrorExit(e)
    }
  }

  setTerminationHandlers() {
    ['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach(signal => process.on(signal, this.terminate))
  }
}

module.exports = Server
