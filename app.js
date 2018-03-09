// const Koa = require('koa')
// const koaLogger = require('koa-logger')
// const koaBody = require('koa-body')
// const jwt = require('koa-jwt')
// const router = require('./routes')
// const { notFound } = require('./middleware/not-found')
// const { errorHandler } = require('./middleware/error-handler')
// const { requestId } = require('./middleware/request-id')
// const { reponseHandler } = require('./middleware/reponse-handler')
// const { logger } = require('./util/logger')

// function startServer () {
//   // Initial variable
//   const app = module.exports = new Koa()
//   // const isDev = process.env.NODE_ENV === 'production'
//   const port = process.env.PORT || 3000
//   const host = process.env.HOST || '127.0.0.1'

//   // Set koa router
//   app
//     .use(requestId())
//     .use(reponseHandler)
//     .use(jwt({
//       secret: 'jwt-secret'
//     }).unless({
//       path: [
//         /\/signup/,
//         /\/signin/,
//         /\/goods/,
//         /\//
//       ]
//     }))
//     .use(koaBody())
//     .use(errorHandler)
//     .use(koaLogger())
//     .use(router.routes())
//     .use(router.allowedMethods())
//     .use(notFound)
//     .on('error', (err) => {
//       if (process.env.NODE_ENV !== 'test') {
//         logger.error(err.message)
//       }
//     })

//   // Listen the server
//   app.listen(port, host)
//   console.log(`Server listening on port ${host}:${port}!`)
// }

// startServer()
// const split = require('split2')
// const stream = split(JSON.parse)
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
