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
  fastify.get('/goods', { schema }, async function (req, reply) {
    const db = new Mongodb(fastify.dbGoods)
    const query = req.query
    const totalCount = await db.count()
    
    try {
      if (!Object.keys(query).length) { 
        const allData = await db.find()
        return reply.send({
          count: totalCount,
          data: allData
        }).code(200)
      }
      const pageData = await db.page(query)
      reply.send({
          count: totalCount,
          data: pageData
      }).code(200)
      // if (!req.query.page || !req.query.size) {
      //   const err = new Error()
      //   err.statusCode = 400
      //   err.message = '请求参数存在错误'
      //   throw err
      // }
    } catch (err) {
      throw err
    }
  })
  next()
}
