const Qiniu = require('../../util/qiniu')

const qiniu = new Qiniu()
const imgReg = /image\//

// TODO: 文件上传方式优化

function uploadFiles (req, reply) {
  /**
   * @param {String} field 文件字段
   * @param {Object} file 可读文件流
   * @param {String} filename 文件名
   * @param {String} encoding 文件编码
   * @param {String} mimetype 文件类型
   */
  async function handler (field, file, filename, encoding, mimetype) {
    try {
      // 只接收图片类型
      if (imgReg.test(mimetype)) {
        const { respBody } = await qiniu.uploadFile(file, filename)
        reply
          .code(201)
          .send({
            code: 201,
            message: '文件上传成功',
            data: respBody
          })
      } else {
        reply
        .code(400)
          .send({
            code: 400,
            message: '图片格式错误',
            data: null
          })
      }
    } catch (err) {
      throw err
    }
  }
  req.multipart(handler, (err) => {
    if (err) { throw err }
  })
}

async function getFiles (req, reply) {
  try {
    const result = await qiniu.getFiles()
    const finalData = result.respBody.items.reduce(function (arr, { key, hash, putTime }) {
      arr.push({ name: key, id: hash, putTime })
      return arr
    }, [])
    reply
      .code(result.statusCode)
      // TODO: 这里需要对header进行正确的处理
      // .header('Content-type', 'application/json; charset=utf-8')
      .send({
        code: result.statusCode,
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
  uploadFiles,
  getFiles,
  deleteFile
}
