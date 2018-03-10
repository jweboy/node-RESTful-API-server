const Mongodb = require('../../lib/mongodb')

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
