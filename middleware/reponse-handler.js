const {
  OK,
  NO_CONTENT,
  BAD_REQUEST,
  FORBIDDEN,
  NOTFOUND,
  INTERNAL_SERVER_ERROR
} = require('../config/resStatus')

exports.reponseHandler = async(ctx, next) => {
  ctx.res.success = (data, message) => {
    ctx.status = ctx.status < 400 ? ctx.status : OK // koa默认是404 / 404 => 200

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
