module.exports = function schma (fastify, opts, next) {
  // upload
  fastify.addSchema(require('../schema/instance/upload').postUploadPictureSuccess)
  fastify.addSchema(require('../schema/instance/upload').postUploadPictureError)
  fastify.addSchema(require('../schema/instance/upload').getPictureList)
  next()
}
