module.exports = function schma (fastify, opts, next) {
  // 正在处理即将废除的
  fastify.addSchema(require('../schema/upload').deletePictureSuccess)
  fastify.addSchema(require('../schema/upload').deletePictureError)
  fastify.addSchema(require('../schema/upload').deletePictureBody)

  // new
  fastify.addSchema(require('../schema/upload/getFile').getFileQuery)
  fastify.addSchema(require('../schema/upload/getFile').getFileSuccess)
  fastify.addSchema(require('../schema/upload/putFile').putFileQuery)
  fastify.addSchema(require('../schema/upload/putFile').putFileSuccess)
  fastify.addSchema(require('../schema/upload/deleteFile').deleteFileParam)
  next()
}
