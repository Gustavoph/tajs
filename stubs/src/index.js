import { Service } from './service.js'

const data = {
  username: `Gustavo-${Date.now()}`,
  password: 'password'
}

const service = new Service({
  filename: './ussasers.ndjson'
})

// await service.create(data)

const users = await service.read()
console.log('users', users)