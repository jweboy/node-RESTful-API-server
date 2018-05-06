const { upload, getFiles, deleteFile } = require('./controller')

module.exports = function (fastify, opts, next) {
  fastify
    .post('/upload/picture', {
      schema: {
        response: {
          200: 'uploadPictureSuccess#',
          400: 'uploadPictureError#'
        }
      }
    }, async function (req, reply) {
      /**
       * @param {String} field 文件字段
       * @param {Object} file 可读文件流
       * @param {String} filename 文件名
       * @param {String} encoding 文件编码
       * @param {String} mimetype 文件类型
       */
      async function handler (field, file, filename, encoding, mimetype) {
        // 只接收图片类型
        if (!/image\//.test(mimetype)) {
          return reply.send({
            code: 400,
            message: '图片格式错误',
            data: {}
          })
        }
        // 图片上传并返回
        const { respBody, respInfo } = await upload(file, filename)
        reply
          .send({
            code: respInfo.statusCode,
            message: '文件上传成功',
            data: respBody
          })
        next()
      }
      req.multipart(handler, (err) => { if (err) throw err })
    })
    .delete('/upload/picture/:fileKey', deleteFile)
    .get('/upload/picture/list', getFiles)
}
