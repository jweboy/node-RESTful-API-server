const router = require('koa-router')()
const { _get } = require('./controller')

router
  .get('/', _get)

module.exports = router
