const upload = require('./controller')
const Qiniu = require('../../util/qiniu')

module.exports = function (fastify, opts, next) {
  fastify.get('/upload', function (request, reply) { 
    const qiniu = new Qiniu()
    const uoloadToken = qiniu.generateToken()
    reply.send(uoloadToken)
  })
}