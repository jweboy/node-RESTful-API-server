module.exports = function schma (fastify, opts, next) {
  // upload
  fastify.addSchema(require('../schema/upload/getFile').getFileQuery)
  fastify.addSchema(require('../schema/upload/getFile').getFileSuccess)
  fastify.addSchema(require('../schema/upload/putFile').putFileQuery)
  fastify.addSchema(require('../schema/upload/putFile').putFileSuccess)
  fastify.addSchema(require('../schema/upload/deleteFile').deleteFileParam)

  // user
  fastify.addSchema(require('../schema/user/signin').postSigninBody)
  fastify.addSchema(require('../schema/user/signin').postSigninSuccess)
  fastify.addSchema(require('../schema/user/signup').postSignupBody)
  fastify.addSchema(require('../schema/user/signup').postSignupSuccess)

  // qiniu
  fastify.addSchema(require('../schema/qiniu/bucket').postBucket)

  next()
}
