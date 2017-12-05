const router = require('koa-router')()
const test = require('./test')
const wechat = require('./wechat')

router.get('/', (ctx) => {
  ctx.body = 'Node Koa API开发测试'
})
router.use('/test', test.routes())
router.use('/wechat', wechat.routes())

module.exports = router