const router = require('koa-router')()
const { getMenu, postMenu, deleteMenu } = require('./controller')

module.exports = () => {
  return router
    .get('/', getMenu)
    .post('/', postMenu)
    .delete('/', deleteMenu)
}
