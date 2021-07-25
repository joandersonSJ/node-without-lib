const http = require('http')
const routes = require('./routes')
const middlewares = require('./utils/middlewares')

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Request endpoint: ${request.url}`)

  const route = routes.find(routeObj => {
    return routeObj.endpoint === request.url && routeObj.method === request.method
  })

  if (route) {
    return route.handler(request, response)
  }

  middlewares.routeNotFound(response)
})

server.listen(3000, () => console.log('Server started'))
