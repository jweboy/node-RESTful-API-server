const fastify = require('fastify')({
  // logger: true
})
// const mongodb = require('mongodb')
// mongodb.MongoClient.connect('mongodb://jweboy:jl940630@ds149743.mlab.com:49743/myapp')
//   .then(client => {
//     const fastify = require('fastify')()
//     fastify.register(goodsRoute)
//     fastify.register(
//       require('fastify-mongodb'),
//       { client }
//     )
//   })
// const util = require('util')
// const mongodb = require('fastify-mongodb')
// const jwt = require('fastify-jwt')
// const mongoConfig = require('./config/mongodb.json')
const routes = require('./route')
const mongodb = require('./middleware/mongodb')

// mongodb register
// const mongoUrl = util.format(
//   mongoConfig.url,
//   mongoConfig.username,
//   mongoConfig.password
// )

// fastify.decorate('util', (request, key, value) => {
//   request.key = value
// })

// fastify.addHook('preHandler', function (request, reply, done) {
//   fastify.util(request, 'timestamp', new Date())
//   done()
// })

// fastify.register(mongodb, {
//   url: mongoUrl
// }).after(err => {
//   console.log(err);
// })

// routes register
fastify
  // .register(jwt, {
  //   secret: 'node-server'
  // })
  .register(routes)
  // .register(usersRoute)

fastify
  .register(mongodb)
  .after(err => {
    // console.log(err)
  })

fastify.get('/', function (request, reply) {
  reply.send('fastify restful api')
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
