const http = require('http')
const url = require('url')
const routes = require('./routes')
const middlewares = require('./utils/middlewares')

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true)
  console.log(`Request method: ${request.method} | Request endpoint: ${parsedUrl.pathname}`)

  const route = routes.find(routeObj => {
    return routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  })

  if (route) {
    request.query = parsedUrl.query
    return route.handler(request, response)
  }

  middlewares.routeNotFound(response)
})

server.listen(3000, () => console.log('Server started'))
