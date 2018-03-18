const goods = require('./goods')
// const users = require('./users')

// module.exports = {
//   goodsRoute: goods,
//   usersRoute: users
// }
module.exports = function (fastify, opts, next) {
  goods(fastify, opts, next)
}
