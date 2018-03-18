const goods = require('./goods')
const user = require('./user')

// module.exports = {
//   goodsRoute: goods,
//   usersRoute: users
// }
module.exports = function (fastify, opts, next) {
  // index route
  fastify.get('/', function (request, reply) {
    reply.send('fastify restful api')
  })
  // fastify.register(users, { prefix: 'users'})
  goods(fastify, opts, next)
  user(fastify, opts, next)
}
