const router = require('koa-router')()
const { signin, signup } = require('./controller')

router.get('/', (ctx) => {
  ctx.body = 'user api test'
})

router.post('/signup', signup)
router.post('/signin', signin)

module.exports = router
