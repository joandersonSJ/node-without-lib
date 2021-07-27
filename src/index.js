const http = require('http')
const { URL } = require('url')
const routes = require('./routes')
const middlewares = require('./utils/middlewares')
const bodyParser = require('./helpers/bodyParser')

const server = http.createServer((request, response) => {
  // Novo parse da URL
  const parsedUrl = new URL(`http://localhost:4000${request.url}`)
  let { pathname } = parsedUrl, id = null


  console.log(`Request method: ${request.method} | Request endpoint: ${pathname}`)

  // Vai fazer o split e remover os campos com aspas vazias, filter(Boolean) pode substituir o filter a baixo.
  const splitEndpoints = pathname.split('/').filter(routeItem => Boolean(routeItem))
  if (splitEndpoints.length > 1) {
    pathname = `/${splitEndpoints[0]}/:id`
    id = splitEndpoints[1]
  }

  const route = routes.find(routeObj => {
    return routeObj.endpoint === pathname && routeObj.method === request.method
  })

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams)
    request.params = { id }
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(body))
    }

    if (['PUT', 'POST'].includes(request.method)) {
      return bodyParser(request, () => route.handler(request, response))
    }
    route.handler(request, response)
  }

  middlewares.routeNotFound(response)
})

server.listen(4000, () => console.log('Server started'))
