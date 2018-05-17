const fastify = require('fastify')({
  // http2目前还没有完全支持 node >= 8.8.1
  // issue https://github.com/fastify/fastify/issues/181
  // http2: true
  logger: require('./config/logger')
})
const jwt = require('fastify-jwt')
const formbody = require('fastify-formbody')
const multipart = require('fastify-multipart')
const auth = require('fastify-auth')
const accepts = require('fastify-accepts')
const CreateError = require('http-errors')
const signale = require('signale')

const routes = require('./route')
const mongodb = require('./middleware/mongodb')
const authCfg = require('./config/auth')
const authUtil = require('./util/auth')
const schema = require('./plugin/schema')

const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'
const protocol = process.env.PROTOCOL || 'http'

// process.env.NODE_ENV = 'development'

// hooks
fastify.addHook('preHandler', function (req, reply, next) {
  // fastify.util(req, 'timestamp', new Date())
  // 设置cors,支持跨域
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next()
})
fastify.addHook('onClose', function (fastify, done) {
  fastify.mongodb.disconnect()
})

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
fastify.register(mongodb)
  .after(err => {
    if (err) { throw err }
    signale.success('Mongodb registration successful.')
  })
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
    if (err) { throw err }
    signale.success('Routes registration successful.')
  })

// start server
fastify.listen(process.env.PORT || 3000)
  .then(() => {
    const Signale = signale.Signale
    const custom = new Signale({
      types: {
        wow: {
          badge: '🎅 ',
          color: 'blue',
          label: 'Wow'
        }
      }
    })
    // const { address, port } = fastify.server.address()
    custom.wow(`Server is running at ${protocol}:${host}:${port}.`)
  })
  .catch(err => {
    signale.error(`Error starting server:${err}.`)
    process.exit(1)
  })

module.exports = fastify
