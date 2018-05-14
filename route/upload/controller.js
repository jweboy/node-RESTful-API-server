const CreateError = require('http-errors')
const Qiniu = require('../../util/qiniu')
// const Mongodb = require('../../util/mongodb')

const qiniu = new Qiniu()

const putFile = (fastify) => (req, reply) => {
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
    console.log('upload completed')
  })

  /**
   * @param {String} field 文件字段
   * @param {Object} file 可读文件流
   * @param {String} filename 文件名
   * @param {String} encoding 文件编码
   * @param {String} mimetype 文件类型
   */
  function handler (fieldName, fileStream, fileName, encoding, mimetype) {
    qiniu
    .uploadFile(fileStream, fileName, { bucket })
      .then(async ({ data }) => {
        const UploadModal = fastify.uploadModel
        const file = new UploadModal(data)
        file.save((err) => {
          console.log('err', err)
          if (!!err) { // eslint-disable-line
            reply.send(new CreateError(500, err))
          } else {
            reply
              .code(200)
              // TODO: 实际返回的data是 {}, JSON Schema 导致的差异,需要优化
              // FIXME: 成功情况不返回message 没啥用处
              .send({ statusCode: 200, data: null })
          }
        })
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

async function getFiles (req, reply) {
  console.log(req.query)
  try {
    const query = { ...req.query }
    const result = await qiniu.getFiles(query)
    const finalData = result.respBody.items.reduce(function (arr, { key, hash, putTime }) {
      arr.push({ name: key, id: hash, putTime })
      return arr
    }, [])
    // console.log(result.respBody.marker)
    reply
      .code(result.statusCode)
      // TODO: 这里需要对header进行正确的处理
      // .header('Content-type', 'application/json; charset=utf-8')
      .send({
        statusCode: result.statusCode,
        message: '文件列表获取成功',
        data: {
          items: finalData,
          total: finalData.length
        }
      })
  } catch (err) {
    throw err
  }
}

// FIXME: 请求的时候fileKey需要encode
async function deleteFile (req, reply) {
  const { fileKey } = req.params
  try {
    const result = await qiniu.deleteFile(decodeURI(fileKey))
    reply
      .code(result.statusCode)
      .send(Object.assign(
        result,
        result.statusCode === 200 && {
          message: '文件删除成功'
        }
      ))
  } catch (err) {
    throw err
  }
}

module.exports = {
  putFile,
  getFiles,
  deleteFile
}
