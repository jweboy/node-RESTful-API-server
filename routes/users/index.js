const router = require('koa-router')()
const { signin, signup } = require('./controller')

router.get('/', (ctx) => {
  ctx.body = 'user api test'
})

router
  .get('/signup', (ctx) => {
    ctx.body = '当前API只有POST方法'
  })
  .post('/signup', signup)
router
  .get('/signin', (ctx) => {
    ctx.body = '当前API只有POST方法'
  })
  .post('/signin', signin)

module.exports = router
