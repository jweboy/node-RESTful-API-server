const router = require('koa-router')()
const { getData } = require('./controller')
const { checkToken } = require('../../middleware/check_token')

router.get('/', checkToken, getData)

module.exports = router
