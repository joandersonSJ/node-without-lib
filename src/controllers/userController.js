const users = require('../mock/users')

module.exports = {
  index(request, response) {
    const { order } = request.query
    const sortedUser = users.sort((a, b) => {

      if (order === 'desc') {
        return a.id < b.id ? 1 : -1
      }
      return a.id > b.id ? 1 : -1
    })
    response.send(200, sortedUser)
  },

  unique(request, response) {
    const user = users.find(userObject => userObject.id === Number(request.params.id))

    if (!user) {
      return response.send(404, { error: 'User not found' })
    }
    response.send(200, user)

  },

  store(request, response) {
    let body = ''

    request.on('data', chunk => {
      body += chunk
    })

    request.on('end', () => {
      body = JSON.parse(body)

      if (!body.name) {
        return response.send(400, { erro: 'Name not send' })
      }
      const lastUserId = users[users.length - 1].id
      const newUser = {
        id: lastUserId + 1,
        name: body.name
      }

      users.push(newUser)
      response.send(200, newUser)
    })

  }
}