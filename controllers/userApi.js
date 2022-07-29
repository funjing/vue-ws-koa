const users = require('../models/users')

module.exports = {
  'GET /api/users': async (ctx, next) => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      data: users.getUsers()
    }
  },

  'POST /api/users': async (ctx, next) => {
    const user = users.createUser(ctx.request.body.name)
    ctx.response.type = 'application/json'
    ctx.response.body = user
  }
}
