const fastify = require('fastify')({
  // http2目前还没有完全支持 node >= 8.8.1
  // issue https://github.com/fastify/fastify/issues/181
  // http2: true
  // logger: true
})
const jwt = require('fastify-jwt')
const formbody = require('fastify-formbody')
const multipart = require('fastify-multipart')
// const leveldb = require('fastify-leveldb')
const auth = require('fastify-auth')
const accepts = require('fastify-accepts')
const CreateError = require('http-errors')

const routes = require('./route')
// const mongodb = require('./middleware/mongodb')
const authCfg = require('./config/auth')
const authUtil = require('./util/auth')
const schema = require('./plugin/schema')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'
const PROTOCOL = 'http'

// hooks
fastify.addHook('preHandler', function (req, reply, next) {
  // fastify.util(req, 'timestamp', new Date())
  // 设置cors,支持跨域
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
  next()
})
// fastify.addHook('onClose', function (fastify, done) {
//   fastify.mongodb.disconnect()
// })

// notFoundHandler
fastify.setNotFoundHandler(function (req, reply) {
  reply.send(new CreateError.NotFound())
})
// errorHandler
fastify.setErrorHandler(function (err, req, reply) {
  reply.send(new CreateError(500, err))
})

// decorate
fastify.decorate('verifyJWTandLevel', authUtil.verifyJWTandLevel)
fastify.decorate('verifyUserAndPassword', authUtil.verifyUserAndPassword)

// accepts register
fastify.register(accepts)
// form body register => parse x-www-form-urlencoded bodies
fastify.register(formbody)
// form-data register
fastify.register(multipart)
// mongodb register
// fastify.register(mongodb)
//   .after(err => {
//     if (err) {
//       throw err
//     }
//     console.log('db connect success!')
//   })
// routes register
fastify
  .register(jwt, {
    secret: authCfg.jwtSecret
  })
  // .register(leveldb, {
  //   name: authCfg.leveldbName
  // })
  .register(auth)
  .register(schema)
  .register(routes, { prefix: 'api' })
  .after(err => {
    if (err) {
      throw err
    }
    console.log('routes register success!')
  })

// start server
fastify.listen(PORT)
  .then(() => {
    // const { address } = fastify.server.address()
    console.log(`Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
  })
  .catch(err => {
    console.log(`Error starting server:${err}`)
    process.exit(1)
  })

// module.exports = fastify
