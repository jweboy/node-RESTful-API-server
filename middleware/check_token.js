const jwt = require('jsonwebtoken')
const { secret } = require('../config/json-web-token')

exports.checkToken = (ctx, next) => {
  const token = ctx.request.body.token || ctx.query.token || ctx.headers['x-access-token']
  if (token) {
    return jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return ctx.res.internalServerError({}, err.message)
      }
      // console.log(decode)
      return next()
    })
  }
  ctx.res.forbidden({}, '请求失败, 缺少token字段')
}