const { signup } = require('./controller')

const schema = {
  username: 'string',
  password: 'string'
}

module.exports = function (fastify, option, next) {
  fastify.post('/signup', { schema }, async function (req, reply) {
    const result = await signup(fastify, req.body)
    reply.send({
      code: 200,
      message: '成功创建新用户!'
    }).code(200)
    next()
  }).get('/signup', function (req, reply) { 
    reply.header('Content-Type', 'application/json')
    reply.send('用户注册接口只有POST方法')
    next()
  })
}
