const Koa = require('koa')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const router = require('./routes')
const { notFound } = require('./middleware/not-found')
const { errorHandler } = require('./middleware/error-handler')
const { logger } = require('./util/logger')

function startServer () {
  // Initial variable
  const app = module.exports = new Koa()
  // const isDev = process.env.NODE_ENV === 'production'
  const port = process.env.PORT || 3000
  const host = process.env.HOST || '127.0.0.1'

  // Set koa router
  app
    .use(koaBody())
    .use(errorHandler)
    .use(koaLogger())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(notFound)
    .on('error', (err) => {
      if (process.env.NODE_ENV !== 'test') {
        logger.error(err.message)
      }
    })

  // Listen the server
  app.listen(port, host)
  console.log(`Server listening on port ${host}:${port}!`)
}

startServer()
