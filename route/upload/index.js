const { putFile, getFile, deleteFile } = require('./controller')
const Mongodb = require('../../util/mongodb')

/**
 * (...args) 路由参数说明
 * @param {Object} fastify - fastify实例
 * @param {Object} opts - fastify配置项
 * @param {Function} next -
 */
module.exports = function (fastify, opts, next) {
  const db = new Mongodb(fastify.dbUpload)
  fastify
    .put('/upload', {
      schema: {
        querystring: 'putFileQuery#',
        response: { 200: 'putFileSuccess#' }
      }
    }, putFile(db))
    .delete('/upload/:id', {
      schema: {
        params: 'deleteFileParam#'
      }
    }, deleteFile(db))
    .get('/upload/list', {
      schema: {
        querystring: 'getFileQuery#',
        response: { 200: 'getFileSuccess#' }
      }
    }, getFile(db))
}
