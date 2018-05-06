const goods = require('./goods')
// const user = require('./user')
const upload = require('./upload')

// module.exports = {
//   goodsRoute: goods,
//   usersRoute: users
// }
module.exports = function (fastify, ...args) {
  // index route
  fastify.get('/', function (request, reply) {
    reply.send('fastify resful api')
  })
  // fastify.register(users, { prefix: 'users'})
  goods(fastify, ...args)
  upload(fastify, ...args)
}
