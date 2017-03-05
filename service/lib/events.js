const onServiceRegistered = async () => {
  console.log("Server registered for Service Discovery.")
}

const onServiceUnregistered = async () => {
  console.log("Server unregistered from Service Discovery.")
}

const onServerRunning = async (uri) => {
  console.log(`Server running at: ${uri}`)
}

const doSafeExit = async () => {
  console.log("Service was gracefully terminated.")
  return process.exit(0)
}

const doErrorExit = async (err) => {
  console.error(err)
  return process.exit(1)
}

const onServiceRegisterError = async (err) => {
  console.error("Can't register for Service Discovery.")
  await doErrorExit(err)
}

const onServiceUnregisterError = async (err) => {
  console.error("Can't unregister from Service Discovery.")
  await doErrorExit(err)
}

module.exports = {
  doErrorExit,
  doSafeExit,
  onServerRunning,
  onServiceRegistered,
  onServiceUnregistered,
  onServiceRegisterError,
  onServiceUnregisterError
}
