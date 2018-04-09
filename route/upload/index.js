const { upload, getBucketList } = require('./controller')

module.exports = function (fastify, opts, next) {
  fastify
    .post('/upload', async function (request, reply) {
      /**
       * @param {String} field 文件字段
       * @param {Object} file 可读文件流
       * @param {String} filename 文件名
       * @param {String} encoding 文件编码
       * @param {String} mimetype 文件类型
       */
      async function handler (field, file, filename, encoding, mimetype) {
        const { respBody, respInfo } = await upload(file, filename)
        reply.send({
          code: respInfo.statusCode,
          message: '文件上传成功',
          data: respBody
        })
        next()
      }
      request.multipart(handler, (err) => { if (err) throw err })
    })
    .get('/upload/list', async function (request, reply) {
      const { respBody, respInfo } = await getBucketList()
      reply.send({
        code: respInfo.statusCode,
        message: '文件列表获取成功',
        data: respBody
      })
      next()
    })
    // 暂时不用
    // .get('/upload/:fid', function (request, reply) {
    //   const { fid } = request.params
    //   console.log(request.params)
    //   // const testPath = '/Users/jweboy/GitRepo/node-server/static/nodejs.png'
    //   const downloadUrl = download(fid)
    //   reply.send({
    //     code: 200,
    //     message: '成功获取文件内容',
    //     data: {
    //       url: downloadUrl
    //     }
    //   })
    //   next()
    // })
}
