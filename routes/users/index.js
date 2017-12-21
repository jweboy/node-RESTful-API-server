const router = require('koa-router')()
const { signup, signin } = require('./controller')

router.get('/', (ctx) => {
  ctx.body = 'user api test'
})

router.post('/signup', signup)
router.post('/signin', signin)

module.exports = router
