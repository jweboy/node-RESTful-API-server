const router = require('koa-router')()
const test = require('./test')
const goods = require('./goods')
const wechat = require('./wechat')

router.use('/test', test.routes())
router.use('/goods', goods.routes())
router.use('/wechat', wechat.routes())

module.exports = router
