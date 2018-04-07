const Qiniu = require('../../util/qiniu')

async function upload () {
  const qiniu = new Qiniu()
  const file = 'static/nodejs.png'
  try {
    const upload = await qiniu.uploadFile(file)
    return upload
  } catch (err) {
    throw err
  }
}

async function download () {

}

module.exports = {
  upload,
  download
}
