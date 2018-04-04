const goods = require('./goods')
const user = require('./user')
const upload = require('./upload')

// module.exports = {
//   goodsRoute: goods,
//   usersRoute: users
// }
module.exports = function (fastify, opts, next) {
  // index route
  fastify.get('/', function (request, reply) {
    reply.send(qiniuClint)
    // reply.send('fastify restful api', qiniuClint)
  })
  // fastify.register(users, { prefix: 'users'})
  goods(fastify, opts, next)
  user(fastify, opts, next)
  upload(fastify, opts, next)
}
