const Mongodb = require('../../util/mongodb')

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
  fastify.get('/goods', async function (request, reply) {
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
