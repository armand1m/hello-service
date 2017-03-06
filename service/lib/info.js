const os = require('os')

module.exports = class Info {
  static get host() {
    return os.hostname()
  }

  static get name() {
    return process.env.SERVICE_NAME
  }

  static get port() {
    return +process.env.SERVICE_PORT
  }

  static get uri() {
    return `http://${Info.host}:${Info.port}`
  }

  static get status() {
    return "healthy"
  }
}
