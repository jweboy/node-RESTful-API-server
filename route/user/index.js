module.exports = function (fastify) {
  fastify.get('/signup', async function (req, reply) {
    const Users = await fastify.dbUser.find().exec()
    console.log(Users);
    reply.send('ok')
  })
}
