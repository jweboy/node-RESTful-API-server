const { uploadFiles, getFiles, deleteFile } = require('./controller')

module.exports = function (fastify, opts, next) {
  fastify
    .post('/upload/picture', uploadFiles)
    .delete('/upload/picture/:fileKey', deleteFile)
    .get('/upload/picture/list', {
      schema: {
        querystring: 'getFilesQuery#',
        response: { 200: 'getFilesSuccess#' }
      }
    }, getFiles)
}
