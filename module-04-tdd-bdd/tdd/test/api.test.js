import { describe, beforeAll, afterAll, it, expect, jest } from '@jest/globals'

import { server } from '../src/api.js'

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once('error', (err) => reject(err))
    server.once('listening', () => resolve())
  })
}

describe('API Users E2E Suite', () => {
  let _testServer
  let _testServerAddress

  function createUser(data) {
    return fetch(`${_testServerAddress}/users`,  {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`)
    return user.json()
  }

  beforeAll(async () => {
    _testServer = server.listen()

    await waitForServerStatus(_testServer)
    const serverInfo = _testServer.address()
    _testServerAddress = `http://localhost:${serverInfo.port}`
  })

  afterAll(done => {
    server.closeAllConnections()
    _testServer.close(done)
  })

  it('should register a new user with young-adult category', async () => {
    jest.useFakeTimers({ now: new Date('2023-12-12T00:00') })
    const expectedCategory = 'young-adult'
    const response = await createUser({
      name: 'Jonh Doe',
      birtday: '2000-01-01' // 21
    })

    const data = await response.json()
    expect(response.status).toBe(201) // 201 - created
    expect(data.id).toBeDefined()

    const user = await findUserById(data.id)
    expect(user.category).toBe(expectedCategory)
  })

  it.todo('should register a new user with adult category')
  it.todo('should register a new user with senior category')
 
  it('should throw n error when registering a under-age user', async () => {
    jest.useFakeTimers({ now: new Date('2023-12-12T00:00') })
    const response = await createUser({
      name: 'Jonh Doe',
      birtday: '2018-01-01' // 5
    })

    expect(response.status).toBe(400) // bad request

    const data = await response.json()
    expect(data.message).toBe('User must be 18yo or older.')
  })
})