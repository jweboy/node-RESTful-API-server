const Koa = require('koa')
const logger = require('koa-logger')
const router = require('./routes')
const { NotFound } = require('./middleware/not-found')

function startServer() {
  // Initial variable
  const app = module.exports = new Koa()
  const isDev = process.env.NODE_ENV === 'production'
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
    .use(NotFound)


  // Listen the server
  app.listen(port, host)
  console.log(`Server listening on port ${host}:${port}!`)
}

startServer()