module.exports = function (fastify) {
  fastify.get('/signup', function (req, reply) {
    reply.send('ok')
  })
}
