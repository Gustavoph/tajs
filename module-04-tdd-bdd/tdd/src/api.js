import { once } from 'node:events'
import { createServer } from 'node:http'
import { randomUUID} from 'node:crypto'

const usersRepository = []

function getUserCategory(birtday) {
  const age = new Date().getFullYear() - new Date(birtday).getFullYear()
  if (age < 18) throw new Error ('User must be 18yo or older.')
  if (age >= 18 && age <= 25) return 'young-adult'
  return ''
}

export const server = createServer(async (request, response) => {
  try {
    if (request.url === '/users' && request.method === 'POST') {
      const data = JSON.parse(await once(request, 'data'))
      const user = {
        ...data,
        id: randomUUID(),
        category: getUserCategory(data.birtday)
      } 
      usersRepository.push(user)
      response.writeHead(201, {  'Content-Type': 'application/json' })
      response.end(JSON.stringify({ id: user.id }))
      return
    }
  
    if (request.url.startsWith('/users/') && request.method === 'GET') {
      console.log('AQUI')
      const [_, users, id] = request.url.split('/')
      const user = usersRepository.find(user => user.id === id)
      response.end(JSON.stringify(user))
      return
    }
  } catch (error) {
    if (error.message.includes('18yo')) {
      response.writeHead(400, { 'Content-Type': 'application/json'})
      response.end(JSON.stringify({ message: error.message }))
      return
    }

    response.writeHead(500, { 'Content-Type': 'application/json'})
    response.end('Internal server error.')
    return
  }
})
