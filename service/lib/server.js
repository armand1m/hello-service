const micro = require('micro')
const service = require('./service')

const Info = require('./info')
const Events = require('./events')
const ConsulAgentService = require('./consul').agent.service

class Server {
  async start() {
    try {
      await micro(service).listen(Info.port)
      await Events.onServerRunning(Info.uri)

      await this.register()
      await Events.onServiceRegistered()

      await this.setTerminationHandlers()
    } catch (e) {
      await Events.onServiceRegisterError(e)
    }
  }

  async terminate() {
    try {
      await instance.unregister()

      await Events.onServiceUnregistered()
      await Events.doSafeExit()
    } catch (e) {
      await Events.onServiceUnregisterError(e)
    }
  }

  async register() {
    return ConsulAgentService.register(Info.description)
  }

  async unregister() {
    return ConsulAgentService.deregister(Info.description.name)
  }

  async setTerminationHandlers() {
    ['SIGINT', 'SIGTERM', 'SIGUSR2', 'SIGHUP'].forEach(signal => process.on(signal, this.terminate))
  }
}

module.exports = Server