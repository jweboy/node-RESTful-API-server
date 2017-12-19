const router = require('koa-router')()
const { signin } = require('./controller')

router.get('/', (ctx) => {
  ctx.body = 'user api test'
})

router.post('/signin', signin)

module.exports = router
