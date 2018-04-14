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

const routes = require('./route')
// const mongodb = require('./middleware/mongodb')
const authCfg = require('./config/auth')
const authUtil = require('./util/auth')
const schema = require('./plugin/schema')

// hooks
fastify.addHook('preHandler', function (req, reply, next) {
  // fastify.util(req, 'timestamp', new Date())
  // 设置cors,支持跨域
  reply.header('Access-Control-Allow-Origin', '*')
  next()
})
// fastify.addHook('onClose', function (fastify, done) {
//   fastify.mongodb.disconnect()
// })

// notFound handler
fastify.setNotFoundHandler(function (req, reply) {
  // reply.header('Access-Control-Allow-Origin', '*')
  reply.send({
    404: true
  })
})

// decorate
fastify.decorate('verifyJWTandLevel', authUtil.verifyJWTandLevel)
fastify.decorate('verifyUserAndPassword', authUtil.verifyUserAndPassword)

// accepts register
fastify.register(accepts)
// form body register => parse x-www-form-urlencoded bodies
fastify.register(formbody)
// any body register
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
  .register(routes)
  .after(err => {
    if (err) {
      throw err
    }
    console.log('routes register success!')
  })

// start server
fastify.listen(process.env.PORT || 3000)
  .then(() => {
    const { address, port } = fastify.server.address()
    console.log(`server is running at ${address}:${port}`)
  })
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })

// module.exports = fastify
