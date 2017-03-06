const micro = require('micro')
const service = require('./service')

const Info = require('./info')
const Events = require('./events')
const ConsulAgentService = require('./consul').agent.service

class Server {
  async start() {
    try {
      await micro(service).listen(Info.port)
      Events.onServerRunning(Info.uri)
    } catch (e) {
      Events.doErrorExit(err)
    }

    try {
      await this.register()
      Events.onServiceRegistered()

      this.setTerminationHandlers()
    } catch (e) {
      Events.onServiceRegisterError(e)
      Events.doErrorExit(err)
    }
  }

  async terminate() {
    try {
      await instance.deregister()

      Events.onServiceUnregistered()
      Events.doSafeExit()
    } catch (e) {
      Events.onServiceUnregisterError(e)
      Events.doErrorExit(err)
    }
  }

  async register() {
    return ConsulAgentService.register(Info.description)
  }

  async deregister() {
    return ConsulAgentService.deregister(Info.description.name)
  }

  setTerminationHandlers() {
    ['SIGINT', 'SIGTERM', 'SIGUSR2', 'SIGHUP'].forEach(signal => process.on(signal, this.terminate))
  }
}

module.exports = Server
