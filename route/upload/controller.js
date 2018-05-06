const Qiniu = require('../../util/qiniu')

const qiniu = new Qiniu()

async function upload (...args) {
  // const file = 'static/nodejs.png'
  try {
    const upload = await qiniu.uploadFile(...args)
    return upload
  } catch (err) {
    throw err
  }
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
  upload,
  getFiles,
  deleteFile
}
