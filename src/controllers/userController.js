let users = require('../mock/users')

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

    const { body } = request

    if (!body?.name) {
      return response.send(400, { erro: 'Name not send' })
    }
    const lastUserId = users[users.length - 1].id
    const newUser = {
      id: lastUserId + 1,
      name: body.name
    }

    users.push(newUser)
    response.send(200, newUser)

  },

  update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const user = users.find(userObject => userObject.id === Number(id))

    if (!user) {
      return response.send(404, { error: 'Message not found' })
    }

    users = users.map(user => {
      if (user.id === Number(id)) {
        return {
          ...user,
          name
        }
      }
      return user
    })

    response.send(200, { id, name })
  }
}