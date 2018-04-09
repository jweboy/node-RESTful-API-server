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

module.exports = {
  upload,
  download,
  getBucketList
}
