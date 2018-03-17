const Mongodb = require('../../lib/mongodb')

// TODO
// error response 可以提取到公用的
// fastify response需要加上schema规范

const schema = {
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' }
  }
}

module.exports = function (fastify, opts, next) {
  fastify.get('/goods', { schema }, async function (req, reply) {
    if (!req.query.page || !req.query.size) {
      const err = new Error()
      err.statusCode = 400
      err.message = '请求参数存在错误'
      throw err
    }
    const db = new Mongodb('goods', this.mongo)
    try {
      const data = await db.find()
      reply.send(data)
    } catch (err) {
      throw err
    }
  })
  next()
}
