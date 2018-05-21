const CreateError = require('http-errors')
const mongoose = require('mongoose')
const signale = require('signale')
const Qiniu = require('../../util/qiniu')

// 文件上传，基于七牛云。
// 文件信息保存mongo数据库，七牛云作为单纯存储库。
const qiniu = new Qiniu()
const putFile = db => (req, reply) => {
  // FIXME:目前不做bucket限制,提供默认值
  const bucket = req.query.bucket || 'our-future'

  // 过滤空form提交
  const headerContentLength = +req.headers['content-length']
  if (!headerContentLength) {
    return reply.send(new CreateError(400, '请至少选择需要上传的文件'))
  }

  // mp is an instance of
  // https://www.npmjs.com/package/busboy
  req.multipart(handler, (err) => {
    if (err) {
      reply.send(err)
    }
    signale.success('🙈 Upload completed!')
  })

  /**
   * @param {String} field 文件字段
   * @param {Object} file 可读文件流
   * @param {String} filename 文件名
   * @param {String} encoding 文件编码
   * @param {String} mimetype 文件类型
   */
  function handler (fieldName, fileStream, fileName, encoding, mimetype) {
    qiniu.uploadFile(fileStream, fileName, { bucket })
      .then(async ({ data }) => {
        try {
          const result = await db.insertOne(data)

          // TODO: 如果data是null, 实际返回的data是 {}, JSON Schema 导致的差异,需要优化
          reply.send({
            statusCode: 200,
            message: '文件上传成功',
            data: result
          })
        } catch (err) {
          reply.send(new CreateError(500, err))
        }
      })
      .catch(err => {
        // 提交不存在bucket
        // 文件可能已经存在
        reply
          .code(err.statusCode)
          // FIXME: 这里需要拷贝一份error,因为全局error托管与 http-errors,它不支持七牛云这类500以上的状态码
          .send({ ...err })
      })
  }
}

// 从mongodb获取文件列表
const getFile = db => async (req, reply) => {
  const query = req.query
  try {
    const count = await db.count()
    const data = await db.pageQuery(query)
    reply.send({
      statusCode: 200,
      message: '文件列表获取成功',
      data: {
        items: data,
        total: count
      }
    })
  } catch (err) {
    reply.send(new CreateError(500, err))
  }
  // TODO: 这里需要对header进行正确的处理
}

// 从mongodb删除指定文件
const deleteFile = db => (req, reply) => {
  const { id } = req.params
  db.findOneAndDelete({ _id: id })
    .then(async (data) => {
      try {
        await qiniu.deleteFile(data.name)
        reply.code(204).send()
      } catch (err) {
        throw err
      }
    })
    .catch(err => reply.send(err))
}

module.exports = {
  putFile,
  getFile,
  deleteFile
}
