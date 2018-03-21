const { signup } = require('./controller')

const schema = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['username', 'password']
  },
  response: {
    201: {
      type: 'object',
      properties: {
        code: { type: 'number' },
        message: { type: 'string' },
        // data: {
        //   username: { type: 'string' },
        //   password: { type: 'string' },
        //   token: { type: 'string' },
        // }
      }
    },
  }
}

module.exports = function (fastify, option, next) {
  fastify.post('/signup', { schema }, async function (request, reply) {
    const result = await signup(fastify, request, reply)
    reply.send({
      code: 201,
      message: '成功创建新用户!',
      data: result,
    })
    next()
  }).get('/signup', function (request, reply) {
    // request.jwtVerify((err, decoded) => { 
    //   console.log(err, decoded);
    // })
    reply.header('Content-Type', 'application/json')
    reply.send('用户注册接口只有POST方法')
    next()
  })
}
