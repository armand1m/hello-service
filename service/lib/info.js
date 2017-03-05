const os = require('os')
const tagPrefix = prefix => `urlprefix-${prefix}`

const SPLITTED_PREFIX = process.env.PREFIXES.split(",")

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

  static get prefixes() {
    return SPLITTED_PREFIX
  }

  static get tags() {
    return SPLITTED_PREFIX.map(tagPrefix)
  }

  static get uri() {
    return `http://${Info.host}:${Info.port}`
  }

  static get description() {
    return {
      name: `${Info.name}:${Info.host}`,
      address: Info.host,
      port: Info.port,
      tags: Info.tags,
      check: {
        http: `${Info.uri}/health`,
        interval: '10s'
      }
    }
  }
}