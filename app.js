const fastify = require('fastify')({
  logger: true
})
const {
  goodsRoute
} = require('./route')

// routes register
fastify.register(goodsRoute)
fastify.get('/', function (request, reply) {
  reply.send({
    hello: 'world'
  })
})

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.send({
    404: true
  })
})

// start server
fastify.listen(4001)
  .then(() => {
    console.log('server is running')
  })
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })
