const os = require('os')

module.exports = class Info {
  static get host() {
    return os.hostname()
  }

  static get name() {
    return process.env.SERVICE_80_NAME
  }

  static get port() {
    return +process.env.SERVICE_PORT || 3000
  }

  static get uri() {
    return `http://${Info.host}:${Info.port}`
  }
}
