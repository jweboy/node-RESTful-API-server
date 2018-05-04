const uuidV4 = require('uuid/v4')

exports.requestId = (option = {}) => {
  const {
    header = 'X-Request-Id',
    propertyName = 'reqId',
    generator = uuidV4()
  } = option

  return (ctx, next) => {
    const reqId = ctx.request.get(header) || generator
    ctx[propertyName] = reqId
    ctx.set(header, reqId)

    return next()
  }
}
