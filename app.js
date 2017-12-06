const Koa = require('koa')
const logger = require('koa-logger')
const router = require('./routes')
const { notFound } = require('./middleware/not-found')
const { errorHandler } = require('./middleware/error-handler')

function startServer () {
  // Initial variable
  const app = module.exports = new Koa()
  // const isDev = process.env.NODE_ENV === 'production'
  const port = process.env.PORT || 3000
  const host = process.env.HOST || '127.0.0.1'

  // Set koa router
  router.get('/', (ctx) => {
    ctx.body = 'Node Koa API开发测试'
  })
  app
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(notFound)
    .use(errorHandler)
    .on('error', (err) => { //! add this to test
      if (process.env.NODE_ENV !== 'test') {
        console.log('sent error %s to the cloud', err.message)
        console.log(err)
      }
    })

  // Listen the server
  app.listen(port, host)
  console.log(`Server listening on port ${host}:${port}!`)
}

startServer()
