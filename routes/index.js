const router = require('koa-router')()
const test = require('./test')
const goods = require('./goods')
const wechat = require('./wechat')
const user = require('./user')

router.get('/', (ctx) => {
  ctx.body = 'Node Koa API Develop Test'
})
router.use('/test', test.routes())
router.use('/goods', goods.routes())
router.use('/wechat', wechat.routes())
router.use('/user', user.routes())

module.exports = router
