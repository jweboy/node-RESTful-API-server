const goods = require('./goods')
const user = require('./user')
const upload = require('./upload')

module.exports = function (fastify, ...args) {
  // index route
  fastify.get('/', function (request, reply) {
    reply
      .send({
        statusCode: 200,
        message: 'fastify RESTful API',
        error: null
      })
  })
  goods(fastify, ...args)
  upload(fastify, ...args)
  user(fastify, ...args)
}
