const { putFile, getFiles, deleteFile } = require('./controller')

module.exports = function (fastify, opts, next) {
  fastify
    .put('/upload/picture', {
      schema: {
        querystring: 'putFileQuery#',
        response: { 200: 'putFileSuccess#' }
      }
    }, putFile)
    .delete('/upload/picture/:fileKey', deleteFile)
    .get('/upload/picture/list', {
      schema: {
        querystring: 'getFilesQuery#',
        response: { 200: 'getFilesSuccess#' }
      }
    }, getFiles)
}
