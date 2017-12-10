const router = require('koa-router')()
const { getData } = require('./controller')

router.get('/', getData)

module.exports = router
