const http = require('http')
const users = require('./mock/users')
const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Request endpoint: ${request.url}`)

  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(users))
})

server.listen(3000, () => console.log('Server started'))
