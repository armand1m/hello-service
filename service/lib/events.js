const onServiceRegistered = () => {
  console.log("Server registered for Service Discovery.")
}

const onServiceUnregistered = () => {
  console.log("Server unregistered from Service Discovery.")
}

const onServerRunning = (uri) => {
  console.log(`Server running at: ${uri}`)
}

const onServiceRegisterError = (err) => {
  console.error("Can't register for Service Discovery.")
}

const onServiceUnregisterError = (err) => {
  console.error("Can't unregister from Service Discovery.")
}

const whenServerShutdown = (callback) => {
  ['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach(signal => process.on(signal, callback))
}

const doSafeExit = () => {
  console.log("Service was gracefully terminated.")

  return process.exit(0)
}

const doErrorExit = (err) => {
  console.log("Service has one or more failures.")
  console.error(err)

  return process.exit(1)
}

module.exports = {
  doErrorExit,
  doSafeExit,
  onServerRunning,
  onServiceRegistered,
  onServiceUnregistered,
  onServiceRegisterError,
  onServiceUnregisterError,
  whenServerShutdown,
}
