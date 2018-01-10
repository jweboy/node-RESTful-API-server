const {
  OK,
  NO_CONTENT,
  BAD_REQUEST,
  FORBIDDEN,
  NOTFOUND,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  FOR,
} = require('../config/response-code')

exports.reponseHandler = async (ctx, next) => {
  console.log('状态码 => for test:', ctx.status)

  ctx.res.success = (data, message) => {
    ctx.status = ctx.status === 404 ? OK : ctx.status // koa默认是404 / 404 => 200

    ctx.body = {
      status: 'success',
      code: ctx.status,
      data,
      message
    }
  }

  ctx.res.fail = (data, message) => {
    ctx.status = ctx.status >= 400 && ctx.status < 500
        ? ctx.status
        : BAD_REQUEST

    ctx.body = {
      status: 'fail',
      code: ctx.status,
      data,
      message
    }
  }

  ctx.res.error = (data, message) => {
    ctx.status = ctx.status >= 500
        ? INTERNAL_SERVER_ERROR
        : ctx.status

    ctx.body = {
      status: 'error',
      code: ctx.status,
      data,
      message
    }
  }
    // ok
  ctx.res.ok = (data, message) => {
    ctx.status = OK
    ctx.res.success(data, message)
  }
    // noContent
  ctx.res.noContent = (data, message) => {
    ctx.status = NO_CONTENT
    ctx.res.success(data, message)
  }
  // 400 => 参数不正确
  ctx.res.paramIncorrect = (data, msg) => {
    ctx.status = FOR
    ctx.res.fail(data, msg)
  }

  // unauthorized
  ctx.res.unauthorized = (data, message) => {
    ctx.status = UNAUTHORIZED
    ctx.res.success(data, message)
  }
    // badRequest
  ctx.res.badRequest = (data, message) => {
    ctx.status = BAD_REQUEST
    ctx.res.fail(data, message)
  }
    // forbidden
  ctx.res.forbidden = (data, message) => {
    ctx.status = FORBIDDEN
    ctx.res.fail(data, message)
  }
    // notFound
  ctx.res.notFound = (data, message) => {
    ctx.status = NOTFOUND
    ctx.res.fail(data, message)
  }
    // internalServerError
  ctx.res.internalServerError = (data, message) => {
    ctx.status = INTERNAL_SERVER_ERROR
    ctx.res.error(data, message)
  }

  await next()
}
