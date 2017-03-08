const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise')

test('hello function', async t => {
  const service = micro(require('../lib/service'))

  const url = await listen(service)
  console.log(url)
  const body = await request(`${url}/${process.env.SERVICE_NAME}/test123`)

  t.deepEqual(JSON.parse(body).message, `Hello, test123!`)
})