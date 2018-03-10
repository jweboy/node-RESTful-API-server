const fastify = require('fastify')({
  logger: true
})
const mongodb = require('fastify-mongodb')
const {
  goodsRoute
} = require('./route')

// mongodb register
fastify.register(mongodb, {
  url: ''
})

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
fastify.listen(4000)
  .then(() => {
    const { address, port } = fastify.server.address()
    console.log(`server is running at ${address}${port}`)
  })
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })
