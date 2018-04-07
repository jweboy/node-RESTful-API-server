// const path = require('path')
// const pump = require('pump')
// const fs = require('fs')
const {
  // upload,
  download } = require('./controller')

module.exports = function (fastify, opts, next) {
  fastify
    .post('/upload', async function (request, reply) {
      // const file = path.resolve('static/nodejs.png')
      // function handler (field, file, filename, encoding, mimetype) {
      //   // concat file with stream
      //   pump(file, fs.createWriteStream('a-destination'))
      // }
      // const mp = request.multipart(handler, function (err) {
      //   if (err) {
      //     throw err
      //   }
      //   console.log('upload completed', process.memoryUsage().rss)
      //   reply.send()
      // })
      // mp is an instance of
      // https://www.npmjs.com/package/busboy
      // mp.on('field', function (key, value) {
      //   console.log('form-data', key, value)
      // })
      // mp.on('file', async function (fieldname, file, filename, encoding, mimetype) {
      //   console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
      //   // file.on('data', function (data) {
      //   //   console.log('File [' + fieldname + '] got ' + data.length + ' bytes')
      //   // })
      //   // file.on('end', function () {
      //   //   console.log('File [' + fieldname + filename + '] - Finished')
      //   // })
      //   // const { respBody, respInfo } = await upload(filename)
      //   // reply.send({
      //   //   code: respInfo.statusCode,
      //   //   message: '文件上传成功',
      //   //   data: respBody
      //   // })
      //   // next()
      // })
      // mp.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      //   console.log('Field [' + fieldname + ']: value: ' + val)
      // })
    })
    .get('/upload/:fid', function (request, reply) {
      const { fid } = request.params
      console.log(request.params)
      // const testPath = '/Users/jweboy/GitRepo/node-server/static/nodejs.png'
      const downloadUrl = download(fid)
      reply.send({
        code: 200,
        message: '成功获取文件内容',
        data: {
          url: downloadUrl
        }
      })
      next()
    })
}
