import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as signale from 'signale'
import * as CreateError from 'http-errors'
import { deleteBucket } from 'route/qiniu';


// const urlData = require('fastify-url-data')
const accepts = require('fastify-accepts')
const formbody = require('fastify-formbody')
const multipart = require('fastify-multipart')
const { postAccessToken, postCreateBucket, getBucketList } = require('./route/qiniu')
// const schema = require('./plugin/schema')
// const routes = require('./route')
// const fastify = require('fastify')({
//     // http2目前还没有完全支持 node >= 8.8.1
//     // issue https://github.com/fastify/fastify/issues/181
//     // http2: true
//     logger: require('./config/logger')
//   })
// const jwt = require('fastify-jwt')
// const auth = require('fastify-auth')
  
//   const mongodb = require('./middleware/mongodb')
//   const authCfg = require('./config/auth')
  
const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'
const protocol = process.env.PROTOCOL || 'http'
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})
  
// process.env.NODE_ENV = 'development'
  
// TODO: next没有定义类型
// hooks
server.addHook('preHandler', function (req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>, next) {
  // 设置cors,支持跨域
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  next()
})

//   server.addHook('onClose', function (fastify, done) {
//     fastify.mongodb.disconnect()
//   })
  
//  notFoundHandler
server.setNotFoundHandler(function (req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
  reply.code(404).send({
    statusCode: 404,
    message: '资源不存在',
    error: null
  })
})

interface ErrorException extends Error {
  statusCode: number,
  message: string,
  stack: string
}

// TODO: ErrorException公共抽离、自定义error抽象
// errorHandler
server.setErrorHandler(function (err: ErrorException, req: fastify.FastifyRequest<IncomingMessage>, reply: fastify.FastifyReply<ServerResponse>) {
  if(err.statusCode > 500) {
    throw err
  } else {
    const errMsg = err.message
    reply.send(new CreateError.InternalServerError(errMsg))
  }
})

// decorate
  
// accepts register
server.register(accepts)
// form body register => parse x-www-form-urlencoded bodies
server.register(formbody)
// form-data register
server.register(multipart)
// mongodb register
// fastify.register(mongodb)
// .after((err: Error) => {
//   if (err) { throw err }
//   signale.success('Mongodb registration successful.')
// })
// routes register
server.register(require('fastify-url-data'))
// server
// .register(jwt, { secret: authCfg.jwtSecret })
// .register(auth)
// .register(schema)
// .register(routes)
// .after((err: Error) => {
//   if (err) { throw err }
//   signale.success('Routes registration successful.')
// })
server.post('/api/qiniu/access-token', postAccessToken)
server.post('/api/qiniu/bucket', postCreateBucket)
server.get('/api/qiniu/bucket', getBucketList)
server.delete('/api/qiniu/bucket', deleteBucket)
// server.register(routes, { prefix: '/api' })



// start server
server.listen(3000, (err: Error) => {
  if(!!err) {
    signale.error(`Error starting server:${err}.`)
    process.exit(1)
  }
  
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
  custom.wow(`Server is running at ${protocol}:${host}:${port}.`)
})
  
export default server
  