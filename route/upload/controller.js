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

function download (filePath) {
  const url = qiniu.downloadFile(filePath)
  return url
}

async function getBucketList () {
  try {
    return await qiniu.getBucketList()
  } catch (err) {
    throw err
  }
}

// FIXME: 请求的时候fileKey需要encode
async function deleteFile (req, reply) {
  const { fileKey } = req.params
  try {
    const result = await qiniu.deleteFile(decodeURI(fileKey))
    if (result.statusCode === 200) {
      return reply.code(200).send({
        ...result,
        message: '文件删除成功'
      })
    }
    reply.code(result.statusCode).send(result)
  } catch (err) {
    throw err
  }
}

module.exports = {
  upload,
  download,
  getBucketList,
  deleteFile
}
