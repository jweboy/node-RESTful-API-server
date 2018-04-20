const { upload, getBucketList, deleteFile } = require('./controller')

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
    .delete('/upload/picture', {
      // params: 'deletePictureBody#',
      // body: 'deletePictureError#',
      schema: {
        response: {
          200: 'deletePictureSuccess#',
          400: 'deletePictureError#'
        }
      }
    }, async function (req, reply) {
      const { fileKey } = req.body
      // schema不验证DELETE的body
      if (!fileKey) {
        return reply.send({
          code: 400,
          message: '请求参数存在错误',
          data: null
        })
      }
      const { respBody, respInfo } = await deleteFile(fileKey)
      reply.send({
        code: respInfo.statusCode,
        message: '文件删除成功',
        data: respBody
      })
    })
    .get('/upload/picture/list', {
      schema: {
        response: {
          200: 'pictureListSuccess#'
        }
      }
    }, async function (req, reply) {
      const { respBody, respInfo } = await getBucketList()
      const finalData = respBody.items.reduce(function (arr, { key, hash, putTime }) {
        arr.push({
          name: key,
          id: hash,
          putTime
        })
        return arr
      }, [])
      reply
        .send({
          code: respInfo.statusCode,
          message: '文件列表获取成功',
          data: {
            items: finalData,
            total: finalData.length
          }
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
