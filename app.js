const Koa = require('koa')
const router = require('./routes')

// Initial variable
const app = new Koa()
// const isDev = process.env.NODE_ENV === 'production'
// const port = process.env.PORT || 3000
// const host = process.env.HOST || '127.0.0.1'

// Set koa router
router.get('/', (ctx) => {
  ctx.body = 'Node Koa API开发测试'
})
app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});


// Listen the server
// app.listen(port, host)
// console.log(`Server listening on port ${host}:${port}!`)

module.exports = app