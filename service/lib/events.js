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


module.exports = {
  doErrorExit,
  doSafeExit,
  onServerRunning
}
