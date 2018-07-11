module.exports = function addSchema (fastify, opts, next) {
  // upload
  fastify.addSchema(require('./upload/getFile').getFileQuery)
  fastify.addSchema(require('./upload/getFile').getFileSuccess)
  fastify.addSchema(require('./upload/putFile').putFileQuery)
  fastify.addSchema(require('./upload/putFile').putFileSuccess)
  fastify.addSchema(require('./upload/deleteFile').deleteFileParam)

  // user
  fastify.addSchema(require('./user/signin').postSigninBody)
  fastify.addSchema(require('./user/signin').postSigninSuccess)
  fastify.addSchema(require('./user/signup').postSignupBody)
  fastify.addSchema(require('./user/signup').postSignupSuccess)

  // qiniu
  fastify.addSchema(require('./qiniu/bucket').postBucket)
  fastify.addSchema(require('./qiniu/bucket').deleteBucket)

  next()
}
