const userController = require('./controllers/userController')


module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: userController.index
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: userController.unique
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: userController.store
  },
]