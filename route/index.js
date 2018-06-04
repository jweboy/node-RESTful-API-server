const goods = require('./goods')
const user = require('./user')
const upload = require('./upload')

module.exports = function (fastify, ...args) {
  // index route
  fastify.get('/', function (request, reply) {
    reply.send('fastify RESTful API')
  })
  goods(fastify, ...args)
  upload(fastify, ...args)
  user(fastify, ...args)
}
