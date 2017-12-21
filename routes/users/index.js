const router = require('koa-router')()
const { signup } = require('./controller')

router.get('/', (ctx) => {
  ctx.body = 'user api test'
})

router.post('/signup', signup)

module.exports = router
