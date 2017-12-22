const { error } = require('../config/response-code')

exports.errorHandler = async function errorHandler (ctx, next) {
  try {
    await next()
  } catch (err) {
    // Some errors has statusCode or status
    ctx.status = err.statusCode || err.status || error
    ctx.type = 'html'
    ctx.body = `<p>${err.message}</p>`

    ctx.app.emit('error', err, ctx)
  }
}
