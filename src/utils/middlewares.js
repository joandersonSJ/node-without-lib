exports.routeNotFound = (response) => {
  response.writeHead(404)
  response.end('Route not found')
}