const fastify = require('fastify')({
  // logger: true
})
// const jwt = require('fastify-jwt')
const routes = require('./route')
const mongodb = require('./middleware/mongodb')

// fastify.addHook('preHandler', function (request, reply, done) {
//   fastify.util(request, 'timestamp', new Date())
//   done()
// })

// mongodb register
fastify.register(mongodb)
  .after(err => {
    if (err) {
      throw err
    }
    console.log('db connect success!');
  })

// routes register
fastify
  // .register(jwt, {
  //   secret: 'node-server'
  // })
  .register(routes)
  .after(err => {
    if (err) {
      throw err
    }
    console.log('routes register success!');
  })

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.send({
    404: true
  })
})

// fastify
  // .addHook('onRequest', function (instance) {
  //   console.log('request', this.mongo)
  // })
  // .addHook('onClose', function () {
  //   console.log('close')
  // })

// start server
fastify.listen(4000)
  .then(() => {
    const { address, port } = fastify.server.address()
    console.log(`server is running at ${address}:${port}`)
  })
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })

  // module.exports = fastify
