const {
  OK
} = require('../config/resStatus')

// https://github.com/posquit0/koa-rest-api-boilerplate/blob/master/app/middlewares/responseHandler.js

exports.reponseHandler = () => {
  return async(ctx, next) => {
    ctx.res.success = (data, message) => {
      ctx.status = ctx.status < 400 ? ctx.status : OK // koa默认是404 / 404 => 200
      ctx.body = {
        status: 'success',
        code: ctx.status,
        data,
        message
      }
    }

    ctx.res.ok = (data, message) => {
      ctx.status = OK
      ctx.res.success(data, message)
    }

    await next()
  }
}
