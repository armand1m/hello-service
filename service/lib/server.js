const micro = require('micro')
const service = require('./service')

const Info = require('./info')
const Events = require('./events')
const ConsulAgentService = require('./consul').agent.service

class Server {
  async start() {
    await this.tryToStartServer()
    await this.tryToRegister()
  }

  async tryToStartServer() {
    try {
      await micro(service).listen(Info.port)
      Events.onServerRunning(Info.uri)
    } catch (e) {
      Events.doErrorExit(err)
    }
  }
  
  async tryToRegister() {
    try {
      await this.register()

      Events.onServiceRegistered()
      Events.whenServerShutdown(this.terminate)
    } catch (e) {
      Events.onServiceRegisterError(e)
      Events.doErrorExit(err)
    }
  }

  async terminate() {
    try {
      await this.deregister()

      Events.onServiceUnregistered()
      Events.doSafeExit()
    } catch (e) {
      Events.onServiceUnregisterError(e)
      Events.doErrorExit(err)
    }
  }

  async register() {
    return ConsulAgentService.register(Info.consul.description)
  }

  async deregister() {
    return ConsulAgentService.deregister(Info.consul.description.name)
  }
}

module.exports = Server
