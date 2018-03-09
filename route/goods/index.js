module.exports = function (fastify, opts, next) {
  fastify.get('/goods', function (request, reply) {
    reply.send({
      goods: true
    })
  })

  next()
}
