module.exports = function schma (fastify, opts, next) {
  // upload
  fastify.addSchema(require('../schema/upload').postUploadPictureSuccess)
  fastify.addSchema(require('../schema/upload').postUploadPictureError)
  fastify.addSchema(require('../schema/upload').deletePictureSuccess)
  fastify.addSchema(require('../schema/upload').deletePictureError)
  fastify.addSchema(require('../schema/upload').deletePictureBody)

  // new
  fastify.addSchema(require('../schema/upload/getFiles').getFilesQuery)
  fastify.addSchema(require('../schema/upload/getFiles').getFilesSuccess)
  next()
}
