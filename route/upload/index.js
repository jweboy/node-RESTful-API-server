const path = require('path')
const upload = require('./controller')

module.exports = function (fastify, opts, next) {
  fastify
    .post('/upload', async function (request, reply) {
      const file = path.resolve('static/nodejs.png')
      const { respBody, respInfo } = await upload(file)
      reply.send({
        code: respInfo.statusCode,
        message: '文件上传成功',
        data: respBody
      })
      next()
    })
    .get('/upload', function (request, reply) { 
      reply.send('upload')
    })
}
