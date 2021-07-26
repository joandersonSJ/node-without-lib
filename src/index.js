const http = require('http')
const { URL } = require('url')
const routes = require('./routes')
const middlewares = require('./utils/middlewares')

const server = http.createServer((request, response) => {
  // Novo parse da URL
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)
  console.log(`Request method: ${request.method} | Request endpoint: ${parsedUrl.pathname}`)

  const route = routes.find(routeObj => {
    return routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  })

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams)
    return route.handler(request, response)
  }

  middlewares.routeNotFound(response)
})

server.listen(3000, () => console.log('Server started'))
